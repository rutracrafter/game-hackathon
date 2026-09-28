import { useEffect, useRef, useState } from "react";
import { levels } from "../levels";
import { NarrationSceneView } from "./NarrationSceneView";
import { FindCharacterSceneView } from "./FindCharacterSceneView";
import { DialogSceneView } from "./DialogSceneView";
import { PickSeatSceneView } from "./PickSeatSceneView";
import { MenuPickSceneView } from "./MenuPickSceneView";
import { TimingBarSceneView } from "./TimingBarSceneView";
import { OverhearingSceneView } from "./OverhearingSceneView";
import { RhythmSceneView } from "./RhythmSceneView";
import { OutfitPickSceneView } from "./OutfitPickSceneView";

/**
 * Game shell: walks through levels, and through the scenes inside each level.
 * Scene types are dispatched below — add a case when adding a new scene type.
 */
export function Game() {
  const [started, setStarted] = useState(false);
  const [levelIndex, setLevelIndex] = useState(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const preloadedImages = useRef<HTMLImageElement[]>([]);

  const level = levels[levelIndex];
  const scene = level?.scenes[sceneIndex];

  useEffect(() => {
    if (!started || !level) return;
    // Start downloading and decoding the chapter's artwork during its opening narration.
    const sources = level.scenes.flatMap((entry) => {
      if (entry.type === "rhythm") return [entry.background, ...entry.dancers.map((dancer) => dancer.image)];
      if (entry.type === "dialog") return [entry.background, entry.character?.image].filter((src): src is string => Boolean(src));
      if (entry.type === "find-character") return [entry.background, ...entry.characters.map((character) => character.image), entry.finalCharacter.image];
      if (entry.type === "menu-pick") return [entry.background, ...entry.options.flatMap((option) => option.background ? [option.background] : [])];
      if (entry.type === "outfit-pick") return [entry.background, ...entry.options.map((option) => option.image)];
      if (entry.type === "pick-seat" || entry.type === "overhearing") return [entry.background];
      if (entry.type === "timing-bar") return entry.background ? [entry.background] : [];
      return [];
    });
    preloadedImages.current = [...new Set(sources)].map((src) => {
      const image = new Image();
      image.src = src;
      void image.decode().catch(() => {});
      return image;
    });
  }, [started, level]);

  const nextScene = () => {
    if (!level) return;
    if (sceneIndex + 1 < level.scenes.length) {
      setSceneIndex(sceneIndex + 1);
    } else {
      setLevelComplete(true);
    }
  };

  const nextLevel = () => {
    setLevelComplete(false);
    if (levelIndex + 1 < levels.length) {
      setLevelIndex(levelIndex + 1);
      setSceneIndex(0);
    } else {
      setStarted(false);
      setLevelIndex(0);
      setSceneIndex(0);
    }
  };

  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-ink">
      <div className="relative aspect-[9/19.5] h-[100dvh] max-h-[100dvh] w-full max-w-[520px] overflow-hidden bg-ink">
        {!started ? (
          <TitleScreen
            onStart={() => setStarted(true)}
            onSelectLevel={(index) => {
              setLevelIndex(index);
              setSceneIndex(0);
              setLevelComplete(false);
              setStarted(true);
            }}
          />
        ) : levelComplete ? (
          <LevelCompleteScreen
            title={level?.subtitle ?? level?.title ?? ""}
            isLast={levelIndex + 1 >= levels.length}
            onNext={nextLevel}
          />
        ) : scene?.type === "narration" ? (
          <NarrationSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : scene?.type === "find-character" ? (
          <FindCharacterSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : scene?.type === "dialog" ? (
          <DialogSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : scene?.type === "pick-seat" ? (
          <PickSeatSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : scene?.type === "menu-pick" ? (
          <MenuPickSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : scene?.type === "timing-bar" ? (
          <TimingBarSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : scene?.type === "overhearing" ? (
          <OverhearingSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : scene?.type === "rhythm" ? (
          <RhythmSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : scene?.type === "outfit-pick" ? (
          <OutfitPickSceneView key={scene.id} scene={scene} onComplete={nextScene} />
        ) : null}
      </div>
    </main>
  );
}

function TitleScreen({
  onStart,
  onSelectLevel,
}: {
  onStart: () => void;
  onSelectLevel: (index: number) => void;
}) {
  // The buttons only work once the page is interactive; show that until then.
  const [ready, setReady] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-ink px-8 text-center">
      <div className="space-y-3">
        <p className="font-pixel text-[10px] uppercase tracking-[0.3em] text-accent">
          A Swedish story
        </p>
        <h1 className="font-pixel text-2xl leading-relaxed text-panel">Lagom</h1>
        <p className="font-body text-base text-muted-foreground">
          Learn Swedish culture, one awkward encounter at a time.
        </p>
      </div>
      <div className="flex w-full max-w-xs flex-col items-center gap-3">
        <button
          type="button"
          onClick={onStart}
          onTouchEnd={(e) => {
            e.preventDefault();
            onStart();
          }}
          disabled={!ready}
          className="touch-manipulation rounded-xl border-2 border-ink bg-primary px-7 py-4 font-pixel text-[11px] uppercase tracking-wider text-primary-foreground shadow-panel active:translate-y-0.5 disabled:opacity-50"
        >
          {ready ? "Start" : "Loading…"}
        </button>
        <button
          type="button"
          onClick={() => setShowLevels((v) => !v)}
          disabled={!ready}
          className="touch-manipulation rounded-xl border-2 border-ink bg-panel px-6 py-3 font-pixel text-[10px] uppercase tracking-wider text-ink shadow-panel active:translate-y-0.5 disabled:opacity-50"
        >
          {showLevels ? "Hide chapters" : "Select chapter"}
        </button>
        {showLevels ? (
          <ul className="flex w-full flex-col gap-2">
            {levels.map((level, index) => (
              <li key={level.id}>
                <button
                  type="button"
                  onClick={() => onSelectLevel(index)}
                  className="touch-manipulation flex w-full items-center gap-3 rounded-xl border-2 border-ink bg-panel px-4 py-3 text-left font-pixel text-[10px] uppercase tracking-wider text-ink shadow-panel active:translate-y-0.5"
                >
                  <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span>{level.subtitle ?? level.title}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function LevelCompleteScreen({
  title,
  isLast,
  onNext,
}: {
  title: string;
  isLast: boolean;
  onNext: () => void;
}) {
  return (
    <div className="animate-fade-in absolute inset-0 flex flex-col items-center justify-center gap-6 bg-ink px-8 text-center">
      <p className="font-pixel text-[10px] uppercase tracking-[0.3em] text-accent">Complete</p>
      <h2 className="font-pixel text-base leading-relaxed text-panel">{title}</h2>
      <button
        type="button"
        onClick={onNext}
        className="rounded-xl border-2 border-ink bg-primary px-6 py-3.5 font-pixel text-[10px] uppercase tracking-wider text-primary-foreground shadow-panel active:translate-y-0.5"
      >
        {isLast ? "Back to title" : "Next chapter"}
      </button>
      {isLast ? (
        <p className="font-body text-sm text-muted-foreground">
          Tack för att du spelade!
        </p>
      ) : null}
    </div>
  );
}
