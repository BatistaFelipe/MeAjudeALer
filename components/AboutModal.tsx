import { useState } from "react";
import Markdown from "react-markdown";

export default function AboutModal() {
  const [data, setData] = useState<string | null>(null);
  const handleAboutModal = async () => {
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
    }
  };

  return (
    <div className="modal">
      <button onClick={handleAboutModal}>Sobre</button>
      {data && <Markdown>{data}</Markdown>}
    </div>
  );
}
