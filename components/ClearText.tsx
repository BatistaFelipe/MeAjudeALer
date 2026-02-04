import { toast } from "sonner";
import { Eraser } from "lucide-react";

interface ClearTextProps {
  onClear: () => void;
}

export function ClearText({ onClear }: ClearTextProps) {
  const handleClear = () => {
    onClear();
    toast.success("Operação realizada!");
  };

  return (
    <button
      onClick={handleClear}
      className="flex-1 min-w-[140px] flex items-center text-sm font-medium whitespace-nowrap justify-center text-red-900 gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
    >
      <Eraser className="w-4 h-4 shrink-0" />
      Limpar
    </button>
  );
}
