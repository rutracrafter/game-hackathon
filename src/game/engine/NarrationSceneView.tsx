import { useState } from "react";
import type { NarrationScene } from "../types";

export function NarrationSceneView({
  scene,
  onComplete,
}: {
  scene: NarrationScene;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);

  const advance = () => {
    if (index + 1 < scene.paragraphs.length) setIndex(index + 1);
    else onComplete();
  };

  return (
    <button
      type="button"
      onClick={advance}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink px-7 text-left"
    >
      <p
        key={index}
        className="animate-fade-in max-w-md font-body text-[1.15rem] leading-relaxed text-panel"
      >
        {scene.paragraphs[index]}
      </p>
      <span className="animate-blink mt-10 font-pixel text-[9px] uppercase tracking-widest text-muted-foreground">
        {scene.hint ?? "Tap to continue"}
      </span>
    </button>
  );
}
