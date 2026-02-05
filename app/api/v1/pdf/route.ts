require("pdf-parse/worker");

import { NextResponse } from "next/server";
import { validatePDF, headerPdfCheck } from "@/lib/utils/validate-pdf";
import { formatterPdf } from "@/lib/utils/formatter-pdf";

export async function POST(request: Request) {
  if (request.method == "POST") {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File;

      let error = validatePDF(file);
      if (error) return NextResponse.json({ error }, { status: 400 });

      const arrayBuffer = await file.arrayBuffer();
      error = headerPdfCheck(arrayBuffer);
      if (error) return NextResponse.json({ error }, { status: 400 });

      const finalData = await formatterPdf(arrayBuffer);

      return NextResponse.json({ text: finalData });
    } catch (error: any) {
      if (error.message.includes("Content-Type")) {
        return NextResponse.json(
          {
            error: "Cabeçalho Content-Type inválido. Use multipart/form-data.",
          },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { error: "Erro ao processar requisição: " + error.message },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ error: "MethodNotAllowed" }, { status: 405 });
}
