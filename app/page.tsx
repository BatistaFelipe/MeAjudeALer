"use client";

import { useState } from "react";
import { BookOpen, Lightbulb } from "lucide-react";
import { cn } from "@/components/cn";
import { ToggleExpand } from "@/components/ToggleExpand";
import { FileUploader } from "@/components/FileUploader";
import { FontSelector } from "@/components/FontSelector";
import { Header } from "@/components/Header";
import { FeaturesInfo } from "@/components/FeaturesInfo";
import { ReadingCanvas } from "@/components/ReadingCanvas";
import { useReadingRuler } from "@/hooks/useReadingRuler";
import AboutModal from "@/components/AboutModal";

export default function DyslexiaReader() {
  const [inputText, setInputText] = useState("");
  const [inputTextDisable, setInputTextDisable] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [selectedFont, setSelectedFont] = useState("OpenDyslexic");
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    rulerPosition,
    showRuler,
    outputRef,
    handleMouseMove,
    handleMouseLeave,
    handleTouchMove,
  } = useReadingRuler();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header pdfFile={pdfFile} />
        <AboutModal />
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
            <ReadingCanvas
              rulerPosition={rulerPosition}
              showRuler={showRuler}
              fontValue={selectedFont || '"OpenDyslexic", sans-serif'}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchMove={handleTouchMove}
              outputRef={outputRef}
            >
              {inputText || (
                <span className="text-gray-500 italic">
                  Seu texto aparecerá aqui...
                </span>
              )}
            </ReadingCanvas>
            <p className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-3">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>
                Mova o mouse ou toque na tela para ativar a régua de leitura
              </span>
            </p>
          </div>
        </div>

        {/* Features Info */}
        <FeaturesInfo />
      </div>
    </div>
  );
}
