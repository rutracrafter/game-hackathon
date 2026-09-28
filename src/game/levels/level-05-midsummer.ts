/** LEVEL 5 — Midsummer. All dialogue and rhythm settings live in this chapter. */
import type { Level } from "../types";
import meadow from "@/assets/midsummer-meadow.jpg";
import felix from "@/assets/midsummer-felix.webp";
import liv from "@/assets/midsummer-liv.webp";
import amir from "@/assets/midsummer-amir.webp";
import sara from "@/assets/midsummer-sara.webp";
import lars from "@/assets/midsummer-lars.webp";

export const level05Midsummer: Level = {
  id: "level-05-midsummer",
  title: "Chapter 5",
  subtitle: "Around the Maypole",
  scenes: [
    {
      type: "narration",
      id: "midsummer-transition",
      paragraphs: [
        "A few weeks later, Felix invites you to spend Midsummer with his friends in the countryside. After your café embarrassment, a fresh start sounds pretty good.",
      ],
    },
    {
      type: "dialog",
      id: "midsummer-welcome",
      background: meadow,
      character: { image: felix, name: "Felix", x: 0.72, scale: 1.18 },
      lines: [
        { speaker: "Felix", text: "Glad midsommar! That means happy Midsummer. We celebrate the long summer days with flowers, food and dancing." },
        { speaker: "You", text: "Please tell me there's no Swedish vocabulary test before the dancing." },
        { speaker: "Felix", text: "No test. Just follow the rhythm! That's Liv, Amir, Sara and Lars. Everyone's joining in." },
        { speaker: "You", text: "Okay. I can do one little dance." },
      ],
    },
    {
      type: "rhythm",
      id: "maypole-dance",
      background: meadow,
      dancers: [
        { name: "Felix", image: felix },
        { name: "Liv", image: liv },
        { name: "Amir", image: amir },
        { name: "Sara", image: sara },
        { name: "Lars", image: lars },
      ],
      beats: 8,
      beatMs: 760,
      requiredHits: 5,
      retryLine: { speaker: "Felix", text: "Almost! No one gets it right the first time. Let's go around once more." },
      successLines: [
        { speaker: "You", text: "Wait... I'm actually doing it!" },
        { speaker: "Felix", text: "See? You already know the most important Midsummer tradition: joining in." },
        { speaker: "You", text: "Glad midsommar, everyone!" },
      ],
    },
  ],
};