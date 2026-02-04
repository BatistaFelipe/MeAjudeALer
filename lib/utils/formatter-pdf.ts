import { PDFParse } from "pdf-parse";

export async function formatterPdf (arrayBuffer: ArrayBuffer){
    const buffer = Buffer.from(arrayBuffer);
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    await parser.destroy();

    // altera o marcador de página de -- 1 of 1 -- para -- pág 1 de 1 --
    const finalData = data.text.replace(
    /--\s+(\d+)\s+of\s+(\d+)\s+--/g,
    "-- pág $1 de $2 --",
    );

    return finalData;
}