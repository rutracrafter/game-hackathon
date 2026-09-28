/**
 * Core game types.
 *
 * A LEVEL is one story step. Each level is fully isolated and lives in its own
 * file under `src/game/levels/`. Levels are stitched together by the ordered
 * list in `src/game/levels/index.ts`.
 *
 * A level is made of SCENES. A scene is one interaction type (narration,
 * finding a character, ...). New scene types can be added by extending the
 * `Scene` union and registering a renderer in `src/game/engine/SceneRenderer.tsx`.
 */

/** A single spoken/displayed line of dialog. */
export interface DialogLine {
  /** Who is talking. Use "You" for the player. */
  speaker: string;
  text: string;
  /** Optional visual shown while this line is spoken. */
  image?: string;
  /**
   * If true, the character leaves the scene *before* this line is shown.
   * Used for the player's reaction after someone walks away.
   */
  afterExit?: boolean;
}

/** A tappable character standing in a scene. */
export interface SceneCharacter {
  id: string;
  name: string;
  /** Image URL (from a `.asset.json` pointer). */
  image: string;
  /** Horizontal placement, 0 = far left, 1 = far right. */
  x: number;
  /** Relative size, 1 = default height. */
  scale?: number;
  /** Dialog played when the character is tapped. */
  lines: DialogLine[];
}

/** Plain text over a full-screen colour. Tap to advance. */
export interface NarrationScene {
  type: "narration";
  id: string;
  /** Each entry is shown one tap at a time. */
  paragraphs: string[];
  hint?: string;
}

/**
 * Tap every character to hear them out. Once all of them are exhausted,
 * `finalCharacter` appears and closes the scene.
 */
export interface FindCharacterScene {
  type: "find-character";
  id: string;
  background: string;
  characters: SceneCharacter[];
  finalCharacter: SceneCharacter;
}

/**
 * Spoken dialog lines. Tap to advance. Over a plain dark screen by default,
 * or over an optional background with an optional character standing in it.
 */
export interface DialogScene {
  type: "dialog";
  id: string;
  lines: DialogLine[];
  hint?: string;
  background?: string;
  character?: { image: string; name: string; x?: number; scale?: number };
}

/** A tap-through conversation heard from nearby tables, over a café backdrop. */
export interface OverhearingScene {
  type: "overhearing";
  id: string;
  background: string;
  lines: DialogLine[];
}

/** One tappable seat option in a pick-seat scene. */
export interface SeatOption {
  id: string;
  /** Hotspot rect as fractions of the background image (0–1). */
  rect: { x: number; y: number; w: number; h: number };
  /** The player's thought when this seat is picked. */
  line: DialogLine;
}

/**
 * Pick a seat: tap the options baked into the background image. Each used
 * option greys out. Once all are exhausted, `finalLine` plays and the scene
 * closes.
 */
export interface PickSeatScene {
  type: "pick-seat";
  id: string;
  background: string;
  options: SeatOption[];
  finalLine: DialogLine;
}

/** One item on a menu baked into the background image. */
export interface MenuOption {
  id: string;
  label: string;
  /** Hotspot rect as fractions of the background image (0–1). */
  rect: { x: number; y: number; w: number; h: number };
  /** Background image to switch to after this item is picked. */
  background?: string;
  /** Optional line shown after picking (e.g. the player's thought). */
  line?: DialogLine;
}

/**
 * Pick `picks` items from a menu baked into the background. After the last
 * pick, `bonusLine` plays if every id in `bonusRequires` was picked, then
 * `finalLines` play and the scene closes.
 */
export interface MenuPickScene {
  type: "menu-pick";
  id: string;
  background: string;
  picks: number;
  prompt?: string;
  options: MenuOption[];
  bonusRequires?: string[];
  bonusLine?: DialogLine;
  finalLines: DialogLine[];
}

/**
 * Timing mini-game: a bar fills and empties; tap while it's inside the
 * target zone. Misses show `failLine` and allow a retry; a hit plays
 * `successLines` and closes the scene.
 */
export interface TimingBarScene {
  type: "timing-bar";
  id: string;
  background?: string;
  prompt?: string;
  /** Target zone as fractions of the bar (0–1). */
  zone: { start: number; end: number };
  /** Milliseconds for one full fill (then the same to empty). */
  speedMs?: number;
  failLine: DialogLine;
  successLines: DialogLine[];
}

/** Dance around the maypole by stepping in time with the music. */
export interface RhythmScene {
  type: "rhythm";
  id: string;
  background: string;
  dancers: { name: string; image: string }[];
  beats: number;
  beatMs: number;
  requiredHits: number;
  successLines: DialogLine[];
  retryLine: DialogLine;
}

/** One wearable choice in an outfit-picking scene. */
export interface OutfitOption {
  id: string;
  label: string;
  category: "jacket" | "accessory" | "boots";
  /** Transparent cutout of the same item shown on the shelf. */
  image: string;
  /** Hotspot rect as fractions of the outfit-shop artwork (0–1). */
  rect: { x: number; y: number; w: number; h: number };
  /** Where to place the cutout on the mannequin, as fractions of the artwork. */
  wearRect: { x: number; y: number; w: number; h: number };
  /** Neutral pieces count toward the understated Swedish-style bonus. */
  tone: "neutral" | "colorful";
}

/** Pick one jacket, accessory, and pair of boots before leaving the shop. */
export interface OutfitPickScene {
  type: "outfit-pick";
  id: string;
  background: string;
  prompt: string;
  options: OutfitOption[];
  bonusLine: DialogLine;
  standardLine: DialogLine;
  finalLines: DialogLine[];
}

export type Scene =
  | NarrationScene
  | FindCharacterScene
  | DialogScene
  | OverhearingScene
  | PickSeatScene
  | MenuPickScene
  | TimingBarScene
  | RhythmScene
  | OutfitPickScene;

export interface Level {
  id: string;
  /** Shown in the chapter card before the level starts. */
  title: string;
  subtitle?: string;
  scenes: Scene[];
}
