import { validatePDF } from "@/lib/utils/validate-pdf";
import { toast } from "sonner";
import { ClearText } from "./ClearText";
import { Type, FileText } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface FileUploaderProps {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  inputTextDisable: boolean;
  setInputTextDisable: Dispatch<SetStateAction<boolean>>;
  setPdfFile: Dispatch<SetStateAction<File | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export function FileUploader({
  inputText,
  setInputText,
  inputTextDisable,
  setInputTextDisable,
  setPdfFile,
  loading,
  setLoading,
  setIsExpanded,
}: FileUploaderProps) {
  const clearText = () => {
    setInputTextDisable(false);
    setPdfFile(null);
    setInputText("");
  };

  const exampleText = `Cole seu texto aqui para uma leitura mais confortável. Esta ferramenta foi desenvolvida para ajudar pessoas com dislexia a ler com mais facilidade, usando espaçamento adequado, cores suaves e uma régua de leitura que acompanha seu movimento.`;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      setLoading(true);

      const error = validatePDF(file);
      if (error) return toast.error(error);

      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/v1/pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao extrair o texto do PDF");
      }

      const data = await response.json();
      if (!data.text) {
        throw new Error("O PDF não tem texto");
      }

      setInputText(data.text);
      setInputTextDisable(true);
      setPdfFile(file);
      setIsExpanded(true);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-amber-700" />
          <h2 className="text-xl font-semibold text-gray-800">
            Texto Original
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-end">
          <label
            className="flex-1 min-w-[140px] flex text-sm font-medium text-amber-900 whitespace-nowrap items-center justify-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors"
            htmlFor="pdf-upload"
          >
            <input
              type="file"
              id="pdf-upload"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            {loading ? (
              "Processando..."
            ) : (
              <>
                <FileText className="w-4 h-4 text-amber-500 shrink-0" />
                Anexar PDF
              </>
            )}
          </label>
          <ClearText onClear={clearText} />
        </div>
      </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={exampleText}
        className="w-full h-96 p-4 border-2 border-amber-200 rounded-xl focus:border-amber-400 focus:outline-none resize-none font-sans text-gray-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-75"
        disabled={inputTextDisable}
      />
    </div>
  );
}
