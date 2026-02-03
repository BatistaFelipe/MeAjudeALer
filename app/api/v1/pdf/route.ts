require("pdf-parse/worker");

import { PDFParse } from "pdf-parse";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 MB
const ALLOWED_MIME_TYPE = "application/pdf";

export async function POST(request: Request) {
  if (request.method == "POST") {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File;

      if (!file)
        return NextResponse.json(
          { error: "Nenhum arquivo encontrado." },
          { status: 400 },
        );

      if (file.type !== ALLOWED_MIME_TYPE) {
        return NextResponse.json(
          { error: "Selecione um arquivo PDF." },
          { status: 400 },
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `O tamanho limite do arquivo é ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
          },
          { status: 413 },
        );
      }

      const arrayBuffer = await file.arrayBuffer();

      const headerCheck = new TextDecoder().decode(arrayBuffer.slice(0, 5));
      if (headerCheck !== "%PDF-") {
        return NextResponse.json(
          { error: "Assinatura do arquivo inválida." },
          { status: 400 },
        );
      }

      const buffer = Buffer.from(arrayBuffer);
      const parser = new PDFParse({ data: buffer });
      const data = await parser.getText();
      await parser.destroy();

      // altera o marcador de página de -- 1 of 1 -- para -- pág 1 de 1 --
      const finalData = data.text.replace(
        /--\s+(\d+)\s+of\s+(\d+)\s+--/g,
        "-- pág $1 de $2 --",
      );

      return NextResponse.json({ text: finalData });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "MethodNotAllowed" }, { status: 405 });
}
