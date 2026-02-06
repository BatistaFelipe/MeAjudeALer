import { BookOpen, FileText } from "lucide-react";
import AboutModal from "./AboutModal";

interface HeaderProps {
  pdfFile: File | null;
}

export function Header({ pdfFile }: HeaderProps) {
  return (
    <div className="text-center items-center justify-center gap-2">
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
      <AboutModal />
    </div>
  );
}
