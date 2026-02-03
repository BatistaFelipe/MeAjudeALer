"use client";

import React, { useState, useRef, MouseEvent, TouchEvent } from "react";
import {
  BookOpen,
  Type,
  Eraser,
  Expand,
  Lightbulb,
  FileText,
} from "lucide-react";
import { cn } from "@/components/cn";
import { toast } from "sonner";

export default function DyslexiaReader() {
  const [inputText, setInputText] = useState("");
  const [rulerPosition, setRulerPosition] = useState(0);
  const [showRuler, setShowRuler] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFont, setSelectedFont] = useState("OpenDyslexic");
  const [inputTextDisable, setInputTextDisable] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const dyslexiaFonts = [
    {
      name: "OpenDyslexic",
      value: '"OpenDyslexic", sans-serif',
      description: "Criada especificamente para dislexia",
    },
    {
      name: "Lexend",
      value: "var(--font-lexend), sans-serif",
      description: "Baseada em pesquisas de legibilidade",
    },
    {
      name: "Comic Sans MS",
      value: '"Comic Sans MS", "Comic Sans", sans-serif',
      description: "Comprovadamente eficaz para dislexia",
    },
    {
      name: "Arial",
      value: "Arial, sans-serif",
      description: "Simples e clara",
    },
    {
      name: "Verdana",
      value: "Verdana, sans-serif",
      description: "Excelente legibilidade em telas",
    },
  ];

  const handleMouseMove = (e: MouseEvent) => {
    if (outputRef.current) {
      const rect = outputRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top + outputRef.current.scrollTop;
      setRulerPosition(y);
      setShowRuler(true);
    }
  };

  const handleMouseLeave = () => {
    setShowRuler(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (outputRef.current && e.touches[0]) {
      const rect = outputRef.current.getBoundingClientRect();
      const y = e.touches[0].clientY - rect.top + outputRef.current.scrollTop;
      setRulerPosition(y);
      setShowRuler(true);
    }
  };

  const clearText = () => {
    setInputTextDisable(false);
    setPdfFile(null);
    setInputText("");
    toast.success("Operação realizada!");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const exampleText = `Cole seu texto aqui para uma leitura mais confortável. Esta ferramenta foi desenvolvida para ajudar pessoas com dislexia a ler com mais facilidade, usando espaçamento adequado, cores suaves e uma régua de leitura que acompanha seu movimento.`;

  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== "application/pdf") {
      toast.error("Selecione um arquivo PDF");
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
        throw new Error(errorData.error || "Falha ao extrair o texto do PDF");
      }

      const data = await response.json();

      if (!data.text) {
        throw new Error("O PDF não tem texto");
      }

      setInputText(data.text);
      setInputTextDisable(true);
      setPdfFile(file);
      toggleExpand();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center items-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BookOpen className="w-10 h-10 text-amber-700" />
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
              MeAjudeALer
            </h1>
          </div>
          <p className="text-amber-800 text-sm md:text-base">
            Ferramenta de leitura otimizada para pessoas com dislexia
          </p>
          {pdfFile && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-amber-900">
              <FileText className="w-4 h-4 text-amber-500" />
              <span className="truncate max-w-[200px]">{pdfFile.name}</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div
          className={cn(
            "flex flex-col md:grid md:grid-cols-2 gap-6",
            isExpanded && "md:grid-cols-1",
          )}
        >
          {/* Input Section */}

          {!isExpanded && (
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
                  <button
                    onClick={clearText}
                    className="flex-1 min-w-[140px] flex items-center text-sm font-medium whitespace-nowrap justify-center text-red-900 gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Eraser className="w-4 h-4 shrink-0" />
                    Limpar
                  </button>
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
          )}

          {/* Output Section with Ruler */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4 ">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Leitura Facilitada
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-amber-700" />
                <select
                  value={selectedFont}
                  onChange={(e) => setSelectedFont(e.target.value)}
                  aria-label="Selecionar fonte para leitura"
                  className="px-3 py-2 text-sm bg-amber-50 text-amber-900 border-2 border-amber-200 rounded-lg hover:bg-amber-100 focus:border-amber-400 focus:outline-none transition-colors cursor-pointer"
                >
                  {dyslexiaFonts.map((font) => (
                    <option key={font.name} value={font.name}>
                      {font.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={toggleExpand}
                  aria-label="Expandir ou recolher modo de leitura"
                  title={isExpanded ? "Recolher" : "Expandir"}
                >
                  <Expand className="w-5 h-5 text-amber-700 hover:bg-amber-100 focus: cursor-pointer" />
                </button>
              </div>
            </div>
            <div
              ref={outputRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseLeave}
              className="relative h-96 bg-red-600 overflow-y-auto rounded-xl p-6 cursor-crosshair"
              style={{
                backgroundColor: "#f5f5dc",
                border: "2px solid #e5e5ca",
              }}
            >
              {/* Reading Ruler */}
              {showRuler && (
                <div
                  className="absolute left-0 right-0 pointer-events-none z-10 transition-all duration-75"
                  style={{
                    top: `${rulerPosition}px`,
                    height: "40px",
                    backgroundColor: "rgba(255, 215, 0, 0.25)",
                    boxShadow: "0 0 8px rgba(255, 215, 0, 0.4)",
                    transform: "translateY(-20px)",
                  }}
                />
              )}

              {/* Text Content */}
              <div
                className="relative z-0"
                style={{
                  fontFamily:
                    dyslexiaFonts.find((font) => font.name === selectedFont)
                      ?.value || '"OpenDyslexic", sans-serif',
                  fontSize: "18px",
                  lineHeight: "2",
                  letterSpacing: "0.1em",
                  color: "#333",
                  maxWidth: "80ch",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {inputText || (
                  <span className="text-gray-500 italic">
                    Seu texto aparecerá aqui com formatação otimizada para
                    leitura...
                  </span>
                )}
              </div>
            </div>
            <p className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-3">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>
                Mova o mouse ou toque na tela para ativar a régua de leitura
              </span>
            </p>
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recursos de Acessibilidade:
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
              <div>
                <strong>Fontes Especiais:</strong> 5 fontes recomendadas para
                dislexia com seletor personalizável
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
              <div>
                <strong>Espaçamento:</strong> Maior distância entre linhas e
                letras
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
              <div>
                <strong>Cores Suaves:</strong> Fundo creme para reduzir cansaço
                visual
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
