import { Dispatch, SetStateAction } from "react";
import { Type } from "lucide-react";

interface FontSelectorProps {
  selectedFont: string;
  setSelectedFont: Dispatch<SetStateAction<string>>;
}
export function FontSelector({
  selectedFont,
  setSelectedFont,
}: FontSelectorProps) {
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

  return (
    <>
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
    </>
  );
}
