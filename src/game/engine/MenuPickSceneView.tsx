import { useState } from "react";
import type { DialogLine, MenuOption, MenuPickScene } from "../types";
import { DialogBox } from "./DialogBox";

/**
 * Menu mini-game: hotspots over menu items baked into the background.
 * Picking an item can swap the background and show a line. After the last
 * pick, an optional bonus line and the final lines play.
 */
export function MenuPickSceneView({
  scene,
  onComplete,
}: {
  scene: MenuPickScene;
  onComplete: () => void;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [bg, setBg] = useState(scene.background);
  const [queue, setQueue] = useState<DialogLine[]>([]);
  const [ending, setEnding] = useState(false);

  const endLines = (ids: string[]) => {
    const bonus =
      scene.bonusLine &&
      scene.bonusRequires &&
      scene.bonusRequires.every((id) => ids.includes(id))
        ? [scene.bonusLine]
        : [];
    return [...bonus, ...scene.finalLines];
  };

  const pick = (option: MenuOption) => {
    if (picked.includes(option.id) || queue.length || ending) return;
    const next = [...picked, option.id];
    setPicked(next);
    if (option.background) setBg(option.background);
    const lines: DialogLine[] = option.line ? [option.line] : [];
    if (next.length >= scene.picks) {
      setEnding(true);
      lines.push(...endLines(next));
    }
    setQueue(lines);
  };

  const advance = () => {
    const rest = queue.slice(1);
    setQueue(rest);
    if (!rest.length && ending) onComplete();
  };

  const line = queue[0];
  const remaining = scene.picks - picked.length;
  const allBackgrounds = Array.from(
    new Set([scene.background, ...scene.options.flatMap((o) => (o.background ? [o.background] : []))]),
  );

  return (
    <div className="animate-fade-in absolute inset-0 overflow-hidden bg-ink">
      {/* Stage keeps the image's aspect ratio so hotspots line up with the art. */}
      <div className="absolute left-1/2 top-1/2 aspect-[941/1672] w-full max-h-full -translate-x-1/2 -translate-y-1/2">
        {/* All backgrounds are mounted up front (preloaded) and cross-faded, so swaps never flash black. */}
        {allBackgrounds.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full transition-opacity duration-300 [image-rendering:pixelated]"
            style={{ opacity: src === bg ? 1 : 0 }}
          />
        ))}
        {scene.options.map((o) => {
          const isPicked = picked.includes(o.id);
          const showHint = !isPicked && !ending && !line;
          return (
            <button
              key={o.id}
              type="button"
              aria-label={o.label}
              disabled={isPicked || ending}
              onClick={() => pick(o)}
              className="absolute z-10"
              style={{
                left: `${o.rect.x * 100}%`,
                top: `${o.rect.y * 100}%`,
                width: `${o.rect.w * 100}%`,
                height: `${o.rect.h * 100}%`,
              }}
            >
              {showHint ? (
                <span className="pointer-events-none absolute inset-0 animate-pulse rounded-md border-[3px] border-accent shadow-[0_0_12px_var(--color-accent)]">
                  <span className="absolute -bottom-3 left-1/2 flex h-6 w-6 -translate-x-1/2 animate-bounce items-center justify-center rounded-full border-2 border-ink bg-accent font-pixel text-[9px] text-accent-foreground">
                    ☝
                  </span>
                </span>
              ) : null}
              {isPicked ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-sm border-2 border-ink bg-accent font-pixel text-sm text-accent-foreground shadow-panel">
                    ✓
                  </span>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {line ? (
        <button
          type="button"
          onClick={advance}
          aria-label="Continue"
          className="absolute inset-0 z-20"
        >
          <DialogBox line={line} />
        </button>
      ) : !ending ? (
        <p className="absolute inset-x-0 bottom-6 z-10 mx-auto w-fit rounded-lg border-2 border-ink bg-panel/90 px-3 py-2 text-center font-pixel text-[9px] uppercase tracking-wider text-panel-foreground">
          {scene.prompt ?? "Pick from the menu"} ({remaining} left)
        </p>
      ) : null}
    </div>
  );
}
