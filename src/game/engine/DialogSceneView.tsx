import { useState } from "react";
import type { DialogScene } from "../types";
import { DialogBox } from "./DialogBox";

/** Spoken dialog, optionally over a background with a character. Tap to advance. */
export function DialogSceneView({
  scene,
  onComplete,
}: {
  scene: DialogScene;
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0);
  const line = scene.lines[index];

  const advance = () => {
    if (index + 1 < scene.lines.length) setIndex(index + 1);
    else onComplete();
  };

  const c = scene.character;

  return (
    <button
      type="button"
      onClick={advance}
      className="animate-fade-in absolute inset-0 z-10 overflow-hidden bg-ink"
    >
      {scene.background ? (
        <img
          src={scene.background}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
        />
      ) : null}
      {c ? (
        <img
          src={c.image}
          alt={c.name}
          draggable={false}
          style={{ left: `${(c.x ?? 0.5) * 100}%`, width: `${(c.scale ?? 1) * 32}%` }}
          className="animate-walk-in pointer-events-none absolute bottom-[16%] h-auto -translate-x-1/2 [image-rendering:pixelated] drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]"
        />
      ) : null}
      {line ? (
        <DialogBox line={line} {...(scene.hint ? { hint: scene.hint } : {})} />
      ) : null}
    </button>
  );
}
