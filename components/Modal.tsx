import { ReactNode, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 m-auto p-6 max-w-3xl w-full rounded-lg shadow-xl backdrop:bg-black/50"
    >
      <div className="flex flex-col gap-4">
        <button onClick={onClose} className="self-end">
          <X size={20} />
        </button>
        <div className="markdown-content">{children}</div>
      </div>
    </dialog>
  );
}
