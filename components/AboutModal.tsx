import { useState } from "react";
import Markdown from "react-markdown";
import { Info, LoaderCircle } from "lucide-react";
import { Modal } from "./Modal";

export default function AboutModal() {
  const [data, setData] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAboutModal = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/about", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao ler arquivo MarkDown.");
      }

      const data = await response.json();
      if (!data.text) {
        throw new Error("Arquivo MarkDown está vazio.");
      }

      setData(data.text); 
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      setData(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center w-full p-2">
      <div className="flex-1"></div>
      <button
        onClick={() => {
          handleAboutModal();
          setIsModalOpen(true);
        }}
        className="flex justify-end gap-1 text-sm font-medium text-amber-900 items-center bg-white border border-amber-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-200 transition-colors"
      >
        {loading ? (
              <LoaderCircle className="animate-spin w-4 h-4 shrink-0" />
            ) : (
        <Info className="w-4 h-4 shrink-0" />
            )}
      </button>
      {!loading && 
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {data && <Markdown>{data}</Markdown>}
      </Modal>
      }
    </div>
  );
}
