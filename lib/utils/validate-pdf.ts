import { PDF_CONFIG } from "../config";

export function validatePDF(file: File) {
  if (!file) return "Arquivo não encontrado.";
  if (file.type !== PDF_CONFIG.MIME_TYPE) return "Selecione um arquivo PDF.";
  if (file.size > PDF_CONFIG.MAX_SIZE) return `O tamanho limite é ${PDF_CONFIG.MAX_SIZE_MB}MB.`;
  return null; // Sem erros
}

export function headerPdfCheck(arrayBuffer: ArrayBuffer) {
    const headerCheck = new TextDecoder().decode(arrayBuffer.slice(0, 5));
    if (headerCheck !== "%PDF-") return "Assinatura do arquivo inválida."
    return null
} 