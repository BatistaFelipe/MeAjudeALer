import fs from "fs";
import { NextResponse } from "next/server";
import { resolve } from "path";

export async function GET(request: Request) {
  if (request.method === "GET") {
    try {
      const aboutFilePath = resolve(process.cwd(), "content", "about.md");
      const text = fs.readFileSync(aboutFilePath, "utf8");
      return NextResponse.json({ text });
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "MethodNotAllowed" }, { status: 405 });
}
