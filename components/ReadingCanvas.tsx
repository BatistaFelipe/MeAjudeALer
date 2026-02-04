import React, { ReactNode } from "react";

interface ReadingCanvasProps {
  rulerPosition: number;
  showRuler: boolean;
  fontValue: string;
  children: ReactNode; // Aqui entra o texto (inputText)
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onTouchMove: (e: React.TouchEvent) => void;
}

export const ReadingCanvas = ({
  rulerPosition,
  showRuler,
  fontValue,
  children,
  onMouseMove,
  onMouseLeave,
  onTouchMove,
}: ReadingCanvasProps) => {
  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onMouseLeave}
      className="relative h-96 overflow-y-auto rounded-xl p-6 cursor-crosshair shadow-inner"
      style={{
        backgroundColor: "#f5f5dc", // O fundo bege que ajuda na dislexia
        border: "2px solid #e5e5ca",
      }}
    >
      {/* Régua de Leitura Isolada */}
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

      {/* Área do Texto */}
      <div
        className="relative z-0"
        style={{
          fontFamily: fontValue,
          fontSize: "18px",
          lineHeight: "2",
          letterSpacing: "0.1em",
          color: "#333",
          maxWidth: "80ch",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {children}
      </div>
    </div>
  );
};
