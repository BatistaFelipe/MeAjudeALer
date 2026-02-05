import { Expand } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ToogleExpandProps {
  toggleExpand: () => void;
  isExpanded: boolean;
}

export function ToggleExpand({ toggleExpand, isExpanded }: ToogleExpandProps) {
  const handleToggleExpand = () => {
    toggleExpand();
  };
  return (
    <button
      onClick={handleToggleExpand}
      aria-label="Expandir ou recolher modo de leitura"
      title={isExpanded ? "Recolher" : "Expandir"}
    >
      <Expand className="w-5 h-5 text-amber-700 hover:bg-amber-100 focus: cursor-pointer" />
    </button>
  );
}
