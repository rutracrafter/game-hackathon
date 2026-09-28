import { useState } from "react";
import type { OverhearingScene } from "../types";
import { DialogBox } from "./DialogBox";

/** Nearby voices appear from opposite sides; the player and Felix stay at the table. */
export function OverhearingSceneView({
  scene,
  onComplete,
}: {
  scene: OverhearingScene;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const line = scene.lines[index];
  const side = line?.speaker === "Person 1" ? "left" : line?.speaker === "Person 2" ? "right" : undefined;

  const advance = () => {
    if (index + 1 < scene.lines.length) setIndex(index + 1);
    else onComplete();
  };

  return (
    <button
      type="button"
      onClick={advance}
      aria-label="Continue story"
      className="animate-fade-in absolute inset-0 z-10 w-full overflow-hidden bg-ink text-left"
    >
      <img
        src={scene.background}
        alt="Felix sitting across from you in the café"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
      />
      {line?.image ? (
        <div className="animate-fade-in absolute left-1/2 top-[39%] z-20 flex aspect-square w-[48%] -translate-x-1/2 items-center justify-center rounded-md border-[3px] border-ink bg-panel/95 p-3 shadow-panel">
          <img src={line.image} alt="A bra, as imagined by the player" className="max-h-full max-w-full object-contain" />
        </div>
      ) : null}
      {line ? <DialogBox key={index} line={line} {...(side ? { side } : {})} /> : null}
    </button>
  );
}