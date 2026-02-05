import { useState, useRef, MouseEvent, TouchEvent } from "react";

export function useReadingRuler() {
  const [rulerPosition, setRulerPosition] = useState(0);
  const [showRuler, setShowRuler] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

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

  return {
    rulerPosition,
    showRuler,
    outputRef,
    handleMouseMove,
    handleMouseLeave,
    handleTouchMove,
  };
}
