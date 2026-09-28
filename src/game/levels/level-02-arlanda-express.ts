/**
 * LEVEL 2 — The Arlanda Express.
 *
 * All dialog text for this level lives here. Edit freely: changing text,
 * adding options or adding scenes does not require touching the engine.
 */
import type { Level } from "../types";

import background from "@/assets/Arlanda_Express_Background.png.asset.json";

export const level02ArlandaExpress: Level = {
  id: "level-02-arlanda-express",
  title: "Chapter 2",
  subtitle: "The Arlanda Express",
  scenes: [
    {
      type: "narration",
      id: "transition",
      paragraphs: [
        "And so your journey into Stockholm begins…",
      ],
      hint: "Tap to continue",
    },
    {
      type: "dialog",
      id: "felix-bags",
      lines: [
        {
          speaker: "Felix",
          text: "Alright, we can take the Arlanda express to T-Centralen. Here, let me help you with your bags!",
        },
      ],
    },
    {
      type: "pick-seat",
      id: "pick-seat",
      background: background.url,
      options: [
        {
          id: "A",
          rect: { x: 0.06, y: 0.24, w: 0.4, h: 0.22 },
          line: {
            speaker: "You",
            text: "Hm, that guy is enjoying his show. I don't want to bother him. I'll sit somewhere else.",
          },
        },
        {
          id: "B",
          rect: { x: 0.54, y: 0.24, w: 0.4, h: 0.22 },
          line: {
            speaker: "You",
            text: "Darn it, she is sitting on the aisle seat and I'm too shy to ask her to move over. That's okay, I can sit somewhere else.",
          },
        },
        {
          id: "C",
          rect: { x: 0.04, y: 0.47, w: 0.42, h: 0.25 },
          line: {
            speaker: "You",
            text: "That guy is really focused on his work, I don't want to get in his way. Let me find another seat.",
          },
        },
        {
          id: "D",
          rect: { x: 0.54, y: 0.47, w: 0.42, h: 0.25 },
          line: {
            speaker: "You",
            text: "He has his bag on the seat, and once again, I'm too shy to ask him to move it. Oh well, I'll find somewhere else to sit.",
          },
        },
      ],
      finalLine: {
        speaker: "You",
        text: "You know what, I think I'll just stand. It's not that long of a train ride anyways and I can just chat with Felix.",
      },
    },
  ],
};
