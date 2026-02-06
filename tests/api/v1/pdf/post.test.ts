import { PDF_CONFIG } from "@/lib/config";
import { makePdfFile, makeFormData } from "@/tests/utils/test-helper";

const { MAX_SIZE, MIME_TYPE, MAX_SIZE_MB } = PDF_CONFIG;

describe("POST /api/v1/pdf", () => {
  test("Expecting an text from pdf.", async () => {
    const content = "Hello, world!";
    const pdfFile = makePdfFile(content);
    const formData = makeFormData(pdfFile, MIME_TYPE);
    const response = await fetch("http:localhost:3000/api/v1/pdf", {
      method: "POST",
      body: formData,
    });

    const responseBody = await response.json();
    expect(responseBody.text.trim()).toBe(content + "\n\n-- pág 1 de 1 --");
    expect(response.status).toBe(200);
  });
});

describe("POST /api/v1/pdf", () => {
  test("Expecting an error when file are to big.", async () => {
    const content = "a".repeat(MAX_SIZE);
    const pdfFile = makePdfFile(content);
    const formData = makeFormData(pdfFile, MIME_TYPE);
    const response = await fetch("http:localhost:3000/api/v1/pdf", {
      method: "POST",
      body: formData,
    });
    const expectedText = `O tamanho limite é ${MAX_SIZE_MB}MB.`;
    const responseBody = await response.json();
    expect(responseBody.error.trim()).toBe(expectedText);
    expect(response.status).toBe(400);
  });
});

describe("POST /api/v1/pdf", () => {
  test("Expecting an error when file not are pdf.", async () => {
    const content = "Hello, world!";
    const notPdfFile = makePdfFile(content);
    const formData = makeFormData(notPdfFile, "text/plain");
    const response = await fetch("http:localhost:3000/api/v1/pdf", {
      method: "POST",
      body: formData,
    });
    const expectedText = "Selecione um arquivo PDF.";
    const responseBody = await response.json();
    expect(responseBody.error.trim()).toBe(expectedText);
    expect(response.status).toBe(400);
  });
});

describe("POST /api/v1/pdf", () => {
  test("Expecting an error when pdf has invalid signature.", async () => {
    const content = "Hello, world!";
    const formData = makeFormData(content, MIME_TYPE);
    const response = await fetch("http:localhost:3000/api/v1/pdf", {
      method: "POST",
      body: formData,
    });
    const expectedText = "Assinatura do arquivo inválida.";
    const responseBody = await response.json();
    expect(responseBody.error.trim()).toBe(expectedText);
    expect(response.status).toBe(400);
  });
});

describe("POST /api/v1/pdf", () => {
  test("Expecting an error when dont send file.", async () => {
    const response = await fetch("http:localhost:3000/api/v1/pdf", {
      method: "POST",
    });
    const expectedText =
      "Cabeçalho Content-Type inválido. Use multipart/form-data.";
    const responseBody = await response.json();
    expect(responseBody.error.trim()).toBe(expectedText);
    expect(response.status).toBe(400);
  });
});
