export function makePdfFile(content: string) {
  return `%PDF-1.1
  1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
  2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj
  3 0 obj << /Type /Page /Parent 2 0 R /Contents 4 0 R /MediaBox [0 0 200 100] >> endobj
  4 0 obj << /Length 23 >> stream
  BT /F1 12 Tf (${content}) Tj ET
  endstream endobj
  xref
  0 5
  0000000000 65535 f
  0000000009 00000 n
  0000000052 00000 n
  0000000101 00000 n
  0000000180 00000 n
  trailer << /Size 5 /Root 1 0 R >>
  startxref
  253
  %%EOF
  `;
}

export function makeFormData(data: string, type: string) {
  const filename = "test.pdf";
  const fileBlob = new Blob([data], { type });
  const formData = new FormData();
  formData.append("file", fileBlob, filename);
  return formData;
}
