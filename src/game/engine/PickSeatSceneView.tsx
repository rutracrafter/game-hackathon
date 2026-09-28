import { useState } from "react";
import type { PickSeatScene, SeatOption } from "../types";
import { DialogBox } from "./DialogBox";

/**
 * Pick-a-seat scene: invisible hotspots sit over the options baked into the
 * background image. Tapping one shows the player's thought and greys the
 * option out. Once every option is used, the final line plays and the scene
 * closes.
 */
export function PickSeatSceneView({
  scene,
  onComplete,
}: {
  scene: PickSeatScene;
  onComplete: () => void;
}) {
  const [used, setUsed] = useState<string[]>([]);
  const [active, setActive] = useState<SeatOption | null>(null);
  const allUsed = used.length === scene.options.length;
  const [showFinal, setShowFinal] = useState(false);

  const pick = (option: SeatOption) => {
    if (used.includes(option.id) || active) return;
    setUsed([...used, option.id]);
    setActive(option);
  };

  const dismissLine = () => {
    if (showFinal) {
      onComplete();
      return;
    }
    setActive(null);
    if (allUsed) setShowFinal(true);
  };

  const currentLine = showFinal ? scene.finalLine : active?.line;

  return (
    <div className="animate-fade-in absolute inset-0">
      <img
        src={scene.background}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {scene.options.map((option) => {
        const isUsed = used.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            aria-label={`Seat option ${option.id}`}
            disabled={isUsed}
            onClick={() => pick(option)}
            className="absolute z-10"
            style={{
              left: `${option.rect.x * 100}%`,
              top: `${option.rect.y * 100}%`,
              width: `${option.rect.w * 100}%`,
              height: `${option.rect.h * 100}%`,
            }}
          >
            {isUsed ? (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-sm border-2 border-destructive bg-ink/80 shadow-[0_3px_0_0_rgba(0,0,0,0.6)]">
                  <span className="relative block h-6 w-6">
                    <span className="absolute left-1/2 top-1/2 h-[5px] w-7 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-destructive" />
                    <span className="absolute left-1/2 top-1/2 h-[5px] w-7 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-destructive" />
                  </span>
                </span>
              </span>
            ) : null}
          </button>
        );
      })}

      {currentLine ? (
        <button
          type="button"
          onClick={dismissLine}
          className="absolute inset-0 z-20"
          aria-label="Continue"
        >
          <DialogBox line={currentLine} />
        </button>
      ) : (
        <p className="animate-blink absolute inset-x-0 bottom-6 z-10 text-center font-pixel text-[9px] uppercase tracking-widest text-panel drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Tap a seat to sit down
        </p>
      )}
    </div>
  );
}
