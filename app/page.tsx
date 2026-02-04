"use client";

import React, { useState, useRef, MouseEvent, TouchEvent } from "react";
import { BookOpen, Lightbulb, FileText } from "lucide-react";
import { cn } from "@/components/cn";
import { ToggleExpand } from "@/components/ToggleExpand";
import { FileUploader } from "@/components/FileUploader";
import { FontSelector } from "@/components/FontSelector";
import { Header } from "@/components/Header";

export default function DyslexiaReader() {
  const [inputText, setInputText] = useState("");
  const [inputTextDisable, setInputTextDisable] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [rulerPosition, setRulerPosition] = useState(0);
  const [showRuler, setShowRuler] = useState(false);
  const [selectedFont, setSelectedFont] = useState("OpenDyslexic");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header pdfFile={pdfFile} />

        {/* Main Content */}
        <div
          className={cn(
            "flex flex-col md:grid md:grid-cols-2 gap-6",
            isExpanded && "md:grid-cols-1",
          )}
        >
          {/* Input Section */}

          {!isExpanded && (
            <FileUploader
              inputText={inputText}
              setInputText={setInputText}
              inputTextDisable={inputTextDisable}
              setInputTextDisable={setInputTextDisable}
              setPdfFile={setPdfFile}
              loading={loading}
              setLoading={setLoading}
              setIsExpanded={setIsExpanded}
            />
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
                <FontSelector
                  selectedFont={selectedFont}
                  setSelectedFont={setSelectedFont}
                />
                <ToggleExpand
                  toggleExpand={toggleExpand}
                  isExpanded={isExpanded}
                />
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
                  fontFamily: selectedFont || '"OpenDyslexic", sans-serif',
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
