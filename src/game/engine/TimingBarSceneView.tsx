import { useEffect, useRef, useState } from "react";
import type { DialogLine, TimingBarScene } from "../types";
import { DialogBox } from "./DialogBox";

/** Tap when the filling bar is inside the target zone. Retry on miss. */
export function TimingBarSceneView({
  scene,
  onComplete,
}: {
  scene: TimingBarScene;
  onComplete: () => void;
}) {
  const [level, setLevel] = useState(0);
  const [running, setRunning] = useState(true);
  const [queue, setQueue] = useState<DialogLine[]>([]);
  const [won, setWon] = useState(false);
  const levelRef = useRef(0);
  const speed = scene.speedMs ?? 1100;

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = ((now - t0) / speed) % 2;
      const v = p < 1 ? p : 2 - p;
      levelRef.current = v;
      setLevel(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, speed]);

  const stop = () => {
    if (!running) return;
    setRunning(false);
    const v = levelRef.current;
    if (v >= scene.zone.start && v <= scene.zone.end) {
      setWon(true);
      setQueue(scene.successLines);
    } else {
      setQueue([scene.failLine]);
    }
  };

  const advance = () => {
    const rest = queue.slice(1);
    setQueue(rest);
    if (!rest.length) {
      if (won) onComplete();
      else setRunning(true);
    }
  };

  const line = queue[0];
  const inZone = level >= scene.zone.start && level <= scene.zone.end;

  return (
    <div className="animate-fade-in absolute inset-0 overflow-hidden bg-ink">
      {scene.background ? (
        <img
          src={scene.background}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
        />
      ) : null}

      <div className="absolute inset-x-6 top-[38%] z-10 rounded-xl border-2 border-ink bg-panel/95 p-4 shadow-panel">
        <p className="mb-3 text-center font-pixel text-[10px] uppercase tracking-wider text-panel-foreground">
          {scene.prompt ?? "Tap when the bar is in the zone"}
        </p>
        <div className="relative h-8 overflow-hidden rounded-md border-2 border-ink bg-ink/80">
          <div
            className="absolute inset-y-0 border-x-2 border-ink bg-accent/40"
            style={{
              left: `${scene.zone.start * 100}%`,
              width: `${(scene.zone.end - scene.zone.start) * 100}%`,
            }}
          />
          <div
            className={`absolute inset-y-0 left-0 ${inZone ? "bg-accent" : "bg-primary"}`}
            style={{ width: `${level * 100}%` }}
          />
          <div
            className="absolute inset-y-0 w-1 bg-panel"
            style={{ left: `calc(${level * 100}% - 2px)` }}
          />
        </div>
        <button
          type="button"
          onClick={stop}
          disabled={!running}
          className="mt-4 w-full touch-manipulation rounded-xl border-2 border-ink bg-primary py-3 font-pixel text-[11px] uppercase tracking-wider text-primary-foreground shadow-panel active:translate-y-0.5 disabled:opacity-50"
        >
          Stop!
        </button>
      </div>

      {line ? (
        <button type="button" onClick={advance} aria-label="Continue" className="absolute inset-0 z-20">
          <DialogBox line={line} />
        </button>
      ) : null}
    </div>
  );
}
