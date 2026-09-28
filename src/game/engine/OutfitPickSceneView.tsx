import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { DialogLine, OutfitOption, OutfitPickScene } from "../types";
import { DialogBox } from "./DialogBox";

const categories: OutfitOption["category"][] = ["jacket", "accessory", "boots"];

export function OutfitPickSceneView({
  scene,
  onComplete,
}: {
  scene: OutfitPickScene;
  onComplete: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState<Partial<Record<OutfitOption["category"], OutfitOption>>>({});
  const [queue, setQueue] = useState<DialogLine[]>([]);
  const complete = categories.every((category) => selected[category]);
  const selectedOptions = useMemo(
    () => categories.flatMap((category) => (selected[category] ? [selected[category]] : [])),
    [selected],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (option: OutfitOption) => {
    if (!ready || queue.length) return;
    setSelected((current) => ({ ...current, [option.category]: option }));
  };

  const finish = () => {
    if (!complete) return;
    const earnedBonus = selectedOptions.every((option) => option.tone === "neutral");
    setQueue([earnedBonus ? scene.bonusLine : scene.standardLine, ...scene.finalLines]);
  };

  const advance = () => {
    if (queue.length > 1) setQueue((current) => current.slice(1));
    else onComplete();
  };

  const line = queue[0];

  return (
    <div className="animate-fade-in absolute inset-0 flex flex-col items-center overflow-hidden bg-ink">
      <div className="relative z-20 mx-3 mt-3 w-[calc(100%-1.5rem)] shrink-0 rounded-lg border-2 border-ink bg-panel/95 px-3 py-2 text-center shadow-panel">
        <p className="font-pixel text-[9px] uppercase leading-relaxed text-panel-foreground">{scene.prompt}</p>
        <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 font-body text-sm leading-tight text-panel-foreground">
          {categories.map((category) => (
            <span key={category} className={`max-w-full [overflow-wrap:anywhere] ${selected[category] ? "font-bold" : "opacity-60"}`}>
              {selected[category] ? "✓" : "○"} {selected[category]?.label ?? category}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto aspect-[4/7] min-h-0 max-w-full flex-1">
          <img
            src={scene.background}
            alt="Winter clothes arranged around a fitting mirror"
            draggable={false}
            width={1024}
            height={1792}
            className="absolute inset-0 h-full w-full [image-rendering:pixelated]"
          />

          {selectedOptions.map((option) => (
            <img
              key={option.category}
              src={option.image}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="pointer-events-none absolute z-[5] h-auto object-fill [image-rendering:pixelated]"
              style={{
                left: `${option.wearRect.x * 100}%`,
                top: `${option.wearRect.y * 100}%`,
                width: `${option.wearRect.w * 100}%`,
                height: `${option.wearRect.h * 100}%`,
              }}
            />
          ))}

          {scene.options.map((option) => {
        const isSelected = selected[option.category]?.id === option.id;
        return (
            <Button
            key={option.id}
            type="button"
            variant="ghost"
            aria-label={`Choose ${option.label}`}
            aria-pressed={isSelected}
            disabled={!ready || Boolean(line)}
            onClick={() => choose(option)}
             className={`absolute z-10 h-auto min-w-0 touch-manipulation rounded-md border-[3px] p-0 transition-all ${
              isSelected
                ? "border-accent bg-accent/25 shadow-[0_0_14px_var(--color-accent)]"
                : ready
                  ? "animate-pulse border-panel/80 bg-transparent"
                  : "border-transparent bg-transparent opacity-0"
            }`}
            style={{
              left: `${option.rect.x * 100}%`,
              top: `${option.rect.y * 100}%`,
              width: `${option.rect.w * 100}%`,
              height: `${option.rect.h * 100}%`,
            }}
          >
            {isSelected ? (
              <span className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-sm border-2 border-ink bg-accent font-pixel text-xs text-accent-foreground">
                ✓
              </span>
            ) : null}
            </Button>
          );
          })}
      </div>

      {!line ? (
         <div className="relative z-20 flex w-full shrink-0 justify-center py-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            type="button"
            disabled={!complete}
            onClick={finish}
            className="h-auto touch-manipulation border-2 border-ink px-5 py-3 font-pixel text-[10px] uppercase tracking-wider shadow-panel"
          >
            {complete ? "Wear this outfit" : `${3 - selectedOptions.length} choices left`}
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={advance}
          aria-label="Continue"
          className="absolute inset-0 z-30 h-full w-full rounded-none bg-transparent p-0 hover:bg-transparent focus-visible:ring-0"
        >
          <DialogBox line={line} />
        </Button>
      )}
    </div>
  );
}