import { useEffect, useRef, useState } from "react";
import type { DialogLine } from "../types";

/** Typewriter dialog box. Tap anywhere on the screen to skip / advance. */
export function DialogBox({ line, hint, side }: { line: DialogLine; hint?: string; side?: "left" | "right" }) {
  const [shown, setShown] = useState("");
  const timer = useRef<number | null>(null);
  const plainText = line.text.replace(/\*\*/g, "");

  useEffect(() => {
    setShown("");
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 1;
      setShown(plainText.slice(0, i));
      if (i >= plainText.length && timer.current !== null) window.clearInterval(timer.current);
    }, 18);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
      timer.current = null;
    };
  }, [line, plainText]);

  const done = shown.length === plainText.length;
  useEffect(() => {
    if (done) return;
    // Capture before the scene's full-screen Continue control sees the tap.
    // The first tap reveals the line; only the next one advances it.
    const reveal = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (timer.current !== null) window.clearInterval(timer.current);
      setShown(plainText);
    };
    document.addEventListener("click", reveal, true);
    document.addEventListener("keydown", reveal, true);
    return () => {
      document.removeEventListener("click", reveal, true);
      document.removeEventListener("keydown", reveal, true);
    };
  }, [done, plainText]);
  // The story files mark vocabulary with **double asterisks**. Preserve the
  // typewriter effect while rendering only the revealed portion in bold.
  const parts = line.text.split(/(\*\*[^*]+\*\*)/g);
  let visibleCount = 0;
  const content = parts.map((part, index) => {
    const bold = part.startsWith("**") && part.endsWith("**");
    const value = bold ? part.slice(2, -2) : part;
    const revealed = value.slice(0, Math.max(0, shown.length - visibleCount));
    visibleCount += value.length;
    return bold ? <strong key={index} className="font-bold">{revealed}</strong> : <span key={index}>{revealed}</span>;
  });

  return (
    <div className={`pointer-events-none absolute z-30 min-w-0 whitespace-normal p-3 text-left ${side === "left" ? "left-0 right-[12%] top-[12%]" : side === "right" ? "left-[12%] right-0 top-[12%]" : "inset-x-0 bottom-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]"}`}>
      <div className="min-w-0 max-h-[calc(100dvh-1.5rem)] overflow-y-auto overflow-x-hidden rounded-xl border-2 border-ink bg-panel/95 p-4 shadow-panel backdrop-blur-sm">
        {line.speaker ? (
          <span className="mb-3 inline-block max-w-full rounded-md border-2 border-ink bg-primary px-2 py-1 font-pixel text-[10px] uppercase leading-relaxed text-primary-foreground [overflow-wrap:anywhere]">
            {line.speaker}
          </span>
        ) : null}
        <p className="min-h-[3rem] max-w-full whitespace-normal font-body text-[clamp(0.875rem,2dvh,1.05rem)] leading-snug text-panel-foreground [overflow-wrap:anywhere]">
          {content}
        </p>
        <span
          className={`mt-1 block text-right font-pixel text-[9px] uppercase leading-relaxed text-muted-foreground [overflow-wrap:anywhere] transition-opacity ${
            done ? "animate-blink opacity-100" : "opacity-0"
          }`}
        >
          {hint ?? "Tap to continue ▸"}
        </span>
      </div>
    </div>
  );
}
