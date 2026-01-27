# CODE REVIEW REPORT - Read PDF Feature

**Data:** 2026-01-27
**Arquivos Analisados:**
- app/api/v1/pdf/route.ts (novo arquivo)
- app/page.tsx (modificado)
- declarations.d.ts (modificado)

---

## CRITICAL ISSUES 🔴

### [CRITICAL] Unhandled API Error Response in Frontend
**File:** `app/page.tsx` (lines 96-108)

**Issue:** A resposta da API não é verificada antes de acessar `data.text`. Se a API retornar erro (400, 500), o código tenta acessar `data.text` que será `undefined`, causando crash.

**Current Code:**
```typescript
const response = await fetch("/api/v1/pdf", {
  method: "POST",
  body: formData,
});
const data = await response.json();
setInputText(data.text);  // CRITICAL: No check for response.ok or error field
toggleExpand();
```

**Fix:**
```typescript
const response = await fetch("/api/v1/pdf", {
  method: "POST",
  body: formData,
});

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.error || "Failed to extract PDF text");
}

const data = await response.json();
if (!data.text) {
  throw new Error("No text extracted from PDF");
}
setInputText(data.text);
toggleExpand();
```

---

### [CRITICAL] Type Safety Violation - `any` Type Used
**File:** `app/api/v1/pdf/route.ts` (lines 27, 31)

**Issues:**
1. Line 27: `item: any` - Tipo inseguro que anula o propósito do TypeScript
2. Line 31: `catch (error: any)` - Handler genérico que perde informação de tipo

**Current Code:**
```typescript
text += content.items.map((item: any) => item.str).join(" ") + "\n";  // Line 27

} catch (error: any) {  // Line 31
    return NextResponse.json({ error: error.message }, { status: 500 });
}
```

**Fix:**
```typescript
interface TextItem {
  str: string;
}

interface TextContent {
  items: TextItem[];
}

// Line 27:
text += content.items.map((item: TextItem) => item.str).join(" ") + "\n";

// Line 31:
} catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
}
```

---

### [CRITICAL] Security: Missing File Size Validation
**File:** `app/api/v1/pdf/route.ts`

**Issue:** Nenhum limite de tamanho de arquivo é imposto. Um atacante pode fazer upload de PDFs extremamente grandes causando:
- Denial of Service (DoS)
- Esgotamento de recursos do servidor
- Memory overflow

**Current Code:**
```typescript
const file = formData.get("file") as File;
if (!file)
  return NextResponse.json({ error: "Nenhum arquivo" }, { status: 400 });

const fileBuffer = await file.arrayBuffer();  // No size check!
```

**Fix:**
```typescript
const file = formData.get("file") as File;
if (!file) {
  return NextResponse.json({ error: "Nenhum arquivo" }, { status: 400 });
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
if (file.size > MAX_FILE_SIZE) {
  return NextResponse.json(
    { error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
    { status: 413 }
  );
}

const fileBuffer = await file.arrayBuffer();
```

---

## HIGH PRIORITY ISSUES 🟠

### [HIGH] Security: Missing MIME Type Validation on Server
**File:** `app/api/v1/pdf/route.ts`

**Issue:** O frontend valida MIME type (`file.type !== "application/pdf"`), mas isso pode ser burlado. O servidor deve validar independentemente.

**Fix:**
```typescript
const file = formData.get("file") as File;
const ALLOWED_MIME_TYPE = "application/pdf";

if (!file) {
  return NextResponse.json({ error: "Nenhum arquivo" }, { status: 400 });
}

if (file.type !== ALLOWED_MIME_TYPE) {
  return NextResponse.json(
    { error: "Only PDF files are allowed" },
    { status: 400 }
  );
}
```

---

### [HIGH] Console.log in Production Code
**File:** `app/page.tsx` (line 105)

**Issue:** `console.error("Erro no upload:", error);` deve ser removido ou enviado para um serviço de logging apropriado.

**Fix:**
```typescript
} catch (error) {
  // Remove console logging or use a proper logging service
  alert("Falha ao processar PDF. Tente novamente.");
  // Optionally: track error to logging service
  // logErrorToService(error);
} finally {
```

---

### [HIGH] Missing Loading State Error Handling
**File:** `app/page.tsx` (lines 81-108)

**Issue:** Se ocorrer um erro, `setLoading(false)` acontece no bloco finally, mas o usuário nunca vê uma mensagem de erro. Apenas uma falha silenciosa ocorre.

**Fix:**
```typescript
const [loading, setLoading] = useState(false);
const [uploadError, setUploadError] = useState<string>("");

const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = event.target.files?.[0];
  setUploadError(""); // Clear previous errors

  if (!file || file.type !== "application/pdf") {
    setUploadError("Please select a PDF file.");
    return;
  }

  setLoading(true);
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/v1/pdf", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to process PDF");
    }

    const data = await response.json();
    if (!data.text) {
      throw new Error("No text could be extracted from the PDF");
    }
    setInputText(data.text);
    toggleExpand();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    setUploadError(message);
  } finally {
    setLoading(false);
  }
};
```

Depois exiba o erro na UI.

---

## MEDIUM PRIORITY ISSUES 🟡

### [MEDIUM] CSS Class Syntax Error in Tailwind
**File:** `app/page.tsx` (lines 171, 215)

**Issue:** Sintaxe CSS incompleta `focus:` sem uma propriedade.

**Current Code (line 171):**
```typescript
className="...border-2 border-red-200 rounded-lg hover:bg-red-200 focus: cursor-pointer..."
```

**Current Code (line 215):**
```typescript
className="w-5 h-5 text-amber-700 hover:bg-amber-100 focus: cursor-pointer"
```

**Fix:** Complete a pseudo-classe focus ou remova:
```typescript
// Option 1: Use proper Tailwind focus class
className="...border-2 border-red-200 rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer..."

// Option 2: Remove incomplete class
className="...border-2 border-red-200 rounded-lg hover:bg-red-200 cursor-pointer..."
```

---

### [MEDIUM] Missing Async Error Boundary in Component
**File:** `app/page.tsx`

**Issue:** A função `handleFileChange` é async e pode lançar exceções, mas não há error boundary. Se algo inesperado acontecer, o componente inteiro pode crashar.

**Recommendation:** Implemente um error boundary apropriado ou envolva operações async em try/catch com feedback ao usuário.

---

### [MEDIUM] Alert() is Poor UX
**File:** `app/page.tsx` (line 87)

**Issue:** Usar `alert()` do navegador é bloqueante e péssima UX. Deveria usar uma notificação toast in-app.

**Current Code:**
```typescript
if (!file || file.type !== "application/pdf") {
  alert("Por favor, selecione um arquivo PDF.");
  return;
}
```

**Better Approach:** Implementar uma notificação toast ou display de estado de erro.

---

### [MEDIUM] Inconsistent Error Response Structure
**File:** `app/api/v1/pdf/route.ts`

**Issue:** Sucesso retorna `{ text: string }` mas erro retorna `{ error: string }`. Deveria ter estrutura consistente.

**Current Code:**
```typescript
return NextResponse.json({ text });  // Success
return NextResponse.json({ error: error.message }, { status: 500 });  // Error
```

**Better Approach:**
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Success:
return NextResponse.json({ success: true, data: { text } });

// Error:
return NextResponse.json(
  { success: false, error: errorMessage },
  { status: 500 }
);
```

---

### [MEDIUM] Missing CORS Headers (if applicable)
**File:** `app/api/v1/pdf/route.ts`

**Issue:** Se esta API for acessada de origens diferentes, headers CORS podem ser necessários. Atualmente, nenhuma configuração CORS está presente.

**Recommendation:** Se requisições cross-origin são esperadas, adicione headers CORS apropriados.

---

### [MEDIUM] File Name Not Validated on Frontend
**File:** `app/page.tsx`

**Issue:** Enquanto o MIME type é checado, a extensão do arquivo não é verificada. Um arquivo `.txt` renomeado para `.pdf` poderia passar na checagem MIME se o navegador reportá-lo incorretamente.

**Recommendation:** Adicione validação de extensão além da checagem de MIME type.

---

## LOW PRIORITY ISSUES / SUGGESTIONS 💡

### [SUGGESTION] Commented Code Should Be Removed
**File:** `app/page.tsx` (lines 166-167)

**Current Code:**
```typescript
{/* <FileText className="w-4 h-4 text-amber-500" />
Importar PDF */}
```

**Fix:** Remova código morto:
```typescript
// Delete lines 166-167 entirely
```

---

### [SUGGESTION] Improve Loading UI for PDF Upload
**File:** `app/page.tsx` (line 157-159)

O label apenas mostra "Processando..." quando loading, mas o input está escondido. Considere mostrar um spinner de loading ou desabilitar o label enquanto processa:

```typescript
<label
  htmlFor="pdf-upload"
  className={cn(
    "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
    loading
      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
      : "bg-amber-50 text-amber-900 border-2 border-amber-200 hover:bg-amber-100 focus:border-amber-400 cursor-pointer"
  )}
>
  {loading ? (
    <>
      {/* Add a loading spinner here */}
      Processando...
    </>
  ) : (
    <>
      <FileText className="w-4 h-4 text-amber-500" />
      Anexar PDF
    </>
  )}
</label>
```

---

### [SUGGESTION] Memory Leak Prevention
**File:** `app/api/v1/pdf/route.ts` (line 21)

**Issue:** A tarefa de loading do PDF cria recursos que deveriam ser explicitamente destruídos.

**Suggestion:**
```typescript
const pdf = await loadingTask.promise;
let text = "";

try {
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: TextItem) => item.str).join(" ") + "\n";
  }
} finally {
  await pdf.destroy();  // Cleanup resources
}
```

---

### [SUGGESTION] Timeout for PDF Processing
**File:** `app/api/v1/pdf/route.ts`

**Issue:** Nenhum timeout é definido para processamento de PDF. PDFs grandes podem causar timeout da requisição sem tratamento explícito.

**Suggestion:** Adicione um wrapper de timeout para a operação de processamento de PDF.

---

### [SUGGESTION] Type the Response Object
**File:** `app/page.tsx` (line 101)

A variável `data` deveria ser tipada:

```typescript
interface PdfResponse {
  text?: string;
  error?: string;
}

const data = (await response.json()) as PdfResponse;
```

---

## SUMMARY TABLE

| Issue | File | Severity | Type |
|-------|------|----------|------|
| Unhandled API error response | `app/page.tsx:96-108` | CRITICAL | Error Handling |
| `any` type used | `app/api/v1/pdf/route.ts:27,31` | CRITICAL | Type Safety |
| Missing file size validation | `app/api/v1/pdf/route.ts` | CRITICAL | Security |
| No server-side MIME validation | `app/api/v1/pdf/route.ts` | HIGH | Security |
| Console.log in production | `app/page.tsx:105` | HIGH | Code Quality |
| Missing error UI feedback | `app/page.tsx:81-108` | HIGH | UX/Error Handling |
| CSS syntax error (focus:) | `app/page.tsx:171,215` | MEDIUM | Styling |
| No async error boundary | `app/page.tsx` | MEDIUM | Error Handling |
| alert() poor UX | `app/page.tsx:87` | MEDIUM | UX |
| Inconsistent API response | `app/api/v1/pdf/route.ts` | MEDIUM | Code Quality |
| Dead commented code | `app/page.tsx:166-167` | LOW | Code Quality |

---

## APPROVAL DECISION

**🚫 BLOCK - CRITICAL ISSUES MUST BE FIXED**

O código tem **3 CRITICAL issues** que devem ser resolvidos antes de commitar:

1. Unhandled API error responses
2. Unsafe `any` type usage
3. Missing file size validation (vulnerabilidade de segurança)

Após corrigi-los, resolva os **3 HIGH issues** também. Os MEDIUM issues podem ser resolvidos em PRs subsequentes se o tempo for limitado, mas devem ser priorizados.

---

## RECOMMENDED NEXT STEPS

- [ ] Corrigir todos os CRITICAL issues imediatamente
- [ ] Corrigir HIGH issues antes de fazer merge
- [ ] Resolver MEDIUM issues na próxima iteração
- [ ] Executar `npm run lint` para pegar problemas de formatação
- [ ] Adicionar UI de tratamento de erro apropriada para feedback do usuário
- [ ] Remover todos os `console.log` antes de finalizar
- [ ] Testar upload com PDFs de diferentes tamanhos
- [ ] Testar upload com arquivos não-PDF para validar segurança
