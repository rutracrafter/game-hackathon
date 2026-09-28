import { useCallback, useEffect, useRef, useState } from "react";
import type { DialogLine, RhythmScene } from "../types";
import { Button } from "@/components/ui/button";
import { DialogBox } from "./DialogBox";

const WINDOW_MS = 230;

/** A short, retryable maypole dance. Tap as each flower meets the yellow line. */
export function RhythmSceneView({ scene, onComplete }: { scene: RhythmScene; onComplete: () => void }) {
  const [phase, setPhase] = useState<"ready" | "playing" | "dialog">("ready");
  const [elapsed, setElapsed] = useState(0);
  const [hits, setHits] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");
  const [flash, setFlash] = useState(0);
  const [queue, setQueue] = useState<DialogLine[]>([]);
  const startAt = useRef(0);
  const hitsRef = useRef<Set<number>>(new Set());
  const audioRef = useRef<AudioContext | null>(null);
  const playedBeat = useRef(-1);
  const wonRef = useRef(false);

  const sound = useCallback((frequency: number, duration = 0.09) => {
    const ctx = audioRef.current;
    if (!ctx || ctx.state !== "running") return;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  }, []);

  const start = useCallback(() => {
    if (typeof window !== "undefined" && !audioRef.current && window.AudioContext) {
      audioRef.current = new AudioContext();
    }
    void audioRef.current?.resume();
    startAt.current = performance.now() + scene.beatMs * 2;
    playedBeat.current = -1;
    hitsRef.current = new Set();
    setHits([]);
    setFeedback("");
    setFlash(0);
    setElapsed(-scene.beatMs * 2);
    setPhase("playing");
  }, [scene.beatMs]);

  useEffect(() => {
    if (phase !== "playing") return;
    let frame = 0;
    const tick = (now: number) => {
      const time = now - startAt.current;
      setElapsed(time);
      const beat = Math.floor(time / scene.beatMs);
      if (beat >= 0 && beat < scene.beats && beat > playedBeat.current) {
        playedBeat.current = beat;
        sound(beat % 2 === 0 ? 440 : 550);
      }
      if (time > (scene.beats - 1) * scene.beatMs + WINDOW_MS + 350) {
        const won = hitsRef.current.size >= scene.requiredHits;
        wonRef.current = won;
        setQueue(won ? scene.successLines : [scene.retryLine]);
        setPhase("dialog");
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [phase, scene, sound]);

  useEffect(() => {
    if (phase !== "playing") return;
    let hiddenAt = 0;
    const visibility = () => {
      if (document.hidden) hiddenAt = performance.now();
      else if (hiddenAt) {
        startAt.current += performance.now() - hiddenAt;
        hiddenAt = 0;
      }
    };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, [phase]);

  useEffect(() => () => { void audioRef.current?.close(); }, []);

  const step = useCallback(() => {
    if (phase !== "playing") return;
    setFlash((value) => value + 1);
    const time = performance.now() - startAt.current;
    const index = Math.round(time / scene.beatMs);
    const distance = Math.abs(time - index * scene.beatMs);
    if (index >= 0 && index < scene.beats && distance <= WINDOW_MS && !hitsRef.current.has(index)) {
      hitsRef.current.add(index);
      setHits([...hitsRef.current]);
      setFeedback(distance < 100 ? "Perfect!" : "Nice!");
      sound(880, 0.16);
    } else {
      setFeedback("Keep the beat!");
    }
  }, [phase, scene.beatMs, scene.beats, sound]);

  useEffect(() => {
    if (phase !== "playing") return;
    const keyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        if (!event.repeat) step();
      }
    };
    window.addEventListener("keydown", keyDown);
    return () => window.removeEventListener("keydown", keyDown);
  }, [phase, step]);

  const advance = () => {
    if (queue.length > 1) {
      setQueue(queue.slice(1));
    } else if (wonRef.current) {
      onComplete();
    } else {
      setQueue([]);
      setPhase("ready");
    }
  };

  const activeBeat = Math.max(0, Math.floor(elapsed / scene.beatMs));
  const rhythm = Math.max(0, elapsed / scene.beatMs);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink [touch-action:manipulation]">
      <img src={scene.background} alt="A flower-covered maypole in a Swedish meadow" className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]" />
      <div className="absolute inset-0 bg-ink/10" />

      {/* The small procession moves around the foot of the maypole. */}
      {scene.dancers.map((dancer, index) => {
        const angle = index * (Math.PI * 2 / scene.dancers.length) + Math.max(0, elapsed) / (scene.beatMs * scene.beats) * Math.PI * 2;
        const x = 50 + Math.cos(angle) * 34;
        const y = 69 + Math.sin(angle) * 8;
        return (
          <img
            key={dancer.name}
            src={dancer.image}
            alt={`${dancer.name} dancing`}
            draggable={false}
            className="pointer-events-none absolute w-[19%] -translate-x-1/2 -translate-y-full object-contain [image-rendering:pixelated] drop-shadow-md"
             style={{ left: `${x}%`, top: `${y}%`, zIndex: Math.round(y / 10) }}
          />
        );
      })}

      {phase === "playing" && flash > 0 ? (
        <div key={flash} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[70] animate-step-flash bg-accent/35" />
      ) : null}

      <div className="absolute inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-10 border-2 border-ink bg-panel/95 px-3 py-3 shadow-panel">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 font-pixel text-[9px] uppercase leading-relaxed text-panel-foreground">
          <span className="min-w-0 [overflow-wrap:anywhere]">Maypole dance</span><span className="min-w-0 text-right [overflow-wrap:anywhere]">{hits.length} / {scene.requiredHits} steps</span>
        </div>
        <div className="mt-3 flex gap-1.5" aria-label={`${hits.length} successful steps of ${scene.beats}`}>
          {Array.from({ length: scene.beats }, (_, i) => (
            <span key={i} className={`h-2 flex-1 border border-ink ${hits.includes(i) ? "bg-accent" : i < activeBeat && phase !== "ready" ? "bg-muted" : "bg-panel"}`} />
          ))}
        </div>
      </div>

      {phase === "playing" && (
        <div className="absolute inset-x-5 bottom-[19%] z-[75] border-2 border-ink bg-panel/95 px-3 pb-3 pt-2 shadow-panel">
          <div className="relative h-12 overflow-hidden bg-secondary" aria-label="Moving beat flowers approaching the target line">
            <div className="absolute inset-y-0 left-[23%] w-[15%] border-x-2 border-accent bg-accent/30" />
            <div className="absolute inset-y-0 left-[30%] w-0.5 bg-accent" />
            {Array.from({ length: scene.beats }, (_, i) => {
              const distance = i - rhythm;
              const position = 30 + distance * 52;
              return position > -10 && position < 110 ? (
                <span key={i} className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 font-body text-3xl ${hits.includes(i) ? "text-accent" : "text-panel"}`} style={{ left: `${position}%` }} aria-hidden="true">✿</span>
              ) : null;
            })}
          </div>
           <p aria-live="polite" className="mt-2 min-h-5 text-center font-pixel text-[9px] leading-relaxed text-panel-foreground [overflow-wrap:anywhere]">{elapsed < 0 ? "Get ready..." : feedback || "Tap when the flower meets the line"}</p>
        </div>
      )}

      {phase === "ready" && (
        <div className="absolute inset-x-5 bottom-[17%] z-[75] border-2 border-ink bg-panel/95 p-4 text-center shadow-panel">
          <p className="font-body text-lg text-panel-foreground">Step to the beat as each flower reaches the yellow line.</p>
          <p className="mt-1 font-body text-sm text-panel-foreground">Land {scene.requiredHits} of {scene.beats} steps to keep up with Felix.</p>
          <Button onClick={start} className="mt-4 h-12 w-full min-w-0 rounded-sm border-2 border-ink font-pixel text-[11px] uppercase shadow-panel">Dance!</Button>
        </div>
      )}
      {phase === "playing" && (
        <Button onClick={step} aria-label="Step to the beat" className="absolute inset-x-5 bottom-[max(2%,env(safe-area-inset-bottom))] z-[75] h-[12%] w-auto touch-manipulation rounded-sm border-2 border-ink bg-primary font-pixel text-sm uppercase shadow-panel active:bg-accent active:text-accent-foreground">Step!</Button>
      )}
      {phase === "dialog" && queue[0] && (
        <Button onClick={advance} aria-label="Continue" variant="ghost" className="absolute inset-0 z-[90] h-full w-full rounded-none p-0 hover:bg-transparent"><DialogBox line={queue[0]} /></Button>
      )}
    </div>
  );
}