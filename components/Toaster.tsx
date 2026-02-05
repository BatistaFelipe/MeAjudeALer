import { CircleCheck, CircleX } from "lucide-react";
import { Toaster } from "sonner";

export default function ToasterNotify() {
  return (
    <Toaster
      closeButton
      toastOptions={{ duration: 2000 }}
      position="top-right"
      visibleToasts={1}
      icons={{
        success: <CircleCheck className="h-4 w-4 text-green-500" />,
        error: <CircleX className="h-4 w-4 text-red-500" />,
      }}
    />
  );
}
