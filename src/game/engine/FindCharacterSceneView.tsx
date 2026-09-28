import { useEffect, useState } from "react";
import type { FindCharacterScene, SceneCharacter } from "../types";
import { DialogBox } from "./DialogBox";

function CharacterSprite({
  character,
  onTap,
  state,
}: {
  character: SceneCharacter;
  onTap?: (() => void) | undefined;
  state: "idle" | "active" | "leaving" | "entering";
}) {
  return (
    <button
      type="button"
      disabled={!onTap}
      onClick={onTap}
      style={{ left: `${character.x * 100}%`, width: `${(character.scale ?? 1) * 32}%` }}
      className={`absolute bottom-[16%] z-20 -translate-x-1/2 transition-all duration-500 ${
        state === "leaving"
          ? "translate-y-6 scale-95 opacity-0"
          : state === "entering"
            ? "animate-walk-in"
            : "opacity-100"
      } ${onTap ? "cursor-pointer active:translate-y-1" : ""}`}
    >
      <img
        src={character.image}
        alt={character.name}
        className={`pointer-events-none h-auto w-full [image-rendering:pixelated] drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)] ${
          onTap ? "animate-bob" : ""
        }`}
      />

      {onTap ? (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md border-2 border-ink bg-accent px-2 py-0.5 font-pixel text-[8px] uppercase text-accent-foreground">
          ?
        </span>
      ) : null}
    </button>
  );
}

export function FindCharacterSceneView({
  scene,
  onComplete,
}: {
  scene: FindCharacterScene;
  onComplete: () => void;
}) {
  const [done, setDone] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [finalArrived, setFinalArrived] = useState(false);

  const allDone = done.length === scene.characters.length;
  const active: SceneCharacter | null = activeId
    ? activeId === scene.finalCharacter.id
      ? scene.finalCharacter
      : (scene.characters.find((c) => c.id === activeId) ?? null)
    : null;
  const line = active?.lines[lineIndex] ?? null;

  useEffect(() => {
    if (!allDone || finalArrived) return;
    const t = window.setTimeout(() => {
      setFinalArrived(true);
      setActiveId(scene.finalCharacter.id);
      setLineIndex(0);
    }, 700);
    return () => window.clearTimeout(t);
  }, [allDone, finalArrived, scene.finalCharacter.id]);

  const advance = () => {
    if (!active) return;
    const next = lineIndex + 1;
    if (next < active.lines.length) {
      setLineIndex(next);
      return;
    }
    if (active.id === scene.finalCharacter.id) {
      onComplete();
      return;
    }
    setDone((d) => [...d, active.id]);
    setActiveId(null);
    setLineIndex(0);
  };

  const exited = Boolean(line?.afterExit);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <img
        src={scene.background}
        alt=""
        className="absolute inset-0 h-full w-full object-cover [image-rendering:pixelated]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

      {!finalArrived &&
        scene.characters.map((c) => {
          const isDone = done.includes(c.id);
          const isActive = activeId === c.id;
          if (isDone) return null;
          return (
            <CharacterSprite
              key={c.id}
              character={c}
              state={isActive && exited ? "leaving" : isActive ? "active" : "idle"}
              onTap={activeId ? undefined : () => setActiveId(c.id)}
            />
          );
        })}

      {finalArrived ? (
        <CharacterSprite character={scene.finalCharacter} state="entering" />
      ) : null}

      {!activeId && !allDone ? (
        <div className="absolute inset-x-0 top-0 z-30 p-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <p className="mx-auto w-fit rounded-lg border-2 border-ink bg-panel/90 px-3 py-2 font-pixel text-[9px] uppercase tracking-wider text-panel-foreground">
            Tap someone to talk
          </p>
        </div>
      ) : null}

      {line ? (
        <button
          type="button"
          onClick={advance}
          aria-label="Continue"
          className="absolute inset-0 z-40 cursor-pointer"
        />
      ) : null}
      {line ? <DialogBox line={line} /> : null}
    </div>
  );
}
