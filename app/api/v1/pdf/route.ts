import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPE = "application/pdf";

export async function POST(request: Request) {
  try {
    // @ts-ignore
    await import("pdfjs-dist/legacy/build/pdf.worker.mjs");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file)
      return NextResponse.json(
        { error: "Nenhum arquivo encontrado" },
        { status: 400 },
      );

    if (file.type !== ALLOWED_MIME_TYPE) {
      return NextResponse.json(
        { error: "Selecione um arquivo PDF" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `O tamanho limite do arquivo é ${MAX_FILE_SIZE / 1024 / 1024}MB`,
        },
        { status: 413 },
      );
    }
    const fileBuffer = await file.arrayBuffer();
    const header = new TextDecoder().decode(fileBuffer.slice(0, 5));

    if (header !== "%PDF-") {
      return NextResponse.json(
        { error: "Assinatura do arquivo inválida" },
        { status: 400 },
      );
    }
    const data = new Uint8Array(fileBuffer);

    const loadingTask = pdfjs.getDocument({
      data,
      useWorkerFetch: false,
      isEvalSupported: false,
    });

    const pdf = await loadingTask.promise;
    let text = "";

    interface TextItem {
      str: string;
    }

    interface TextContent {
      items: Array<TextItem | { type: string }>;
    }

    try {
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = (await page.getTextContent()) as unknown as TextContent;
        text +=
          content.items
            .filter((item): item is TextItem => "str" in item)
            .map((item) => item.str)
            .join(" ") + "\n";
      }
    } finally {
      await pdf.destroy();
    }

    return NextResponse.json({ text });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
