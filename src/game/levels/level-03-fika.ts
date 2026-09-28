/**
 * LEVEL 3 — Fika.
 *
 * All dialog text for this level lives here. Edit freely.
 */
import type { Level } from "../types";

import felix from "@/assets/Pewdiepie.png.asset.json";
import barista from "@/assets/Barista.png.asset.json";
import baristaHappy from "@/assets/Barista_happy.png.asset.json";
import baristaJudging from "@/assets/Barista_judging.png.asset.json";

const judging = {
  background: baristaJudging.url,
  line: { speaker: "You", text: "I think she is judging me…" },
};

export const level03Fika: Level = {
  id: "level-03-fika",
  title: "Chapter 3",
  subtitle: "Fika",
  scenes: [
    {
      type: "narration",
      id: "transition",
      paragraphs: [
        "You arrive in T-Centralen and Felix invites you to go for a Fika. You gladly accept!",
      ],
    },
    {
      type: "dialog",
      id: "felix-seat",
      // TODO: swap in the café background + standing Felix once provided.
      character: { image: felix.url, name: "Felix", x: 0.5, scale: 1.15 },
      lines: [
        {
          speaker: "Felix",
          text: "I'll go get us a seat, you can order for the both of us and we can split the bill later.",
        },
        {
          speaker: "You",
          text: "Sure, that sounds good. Let's just hope I order some tasty stuff.",
        },
      ],
    },
    {
      type: "dialog",
      id: "barista-greeting",
      background: barista.url,
      lines: [
        { speaker: "Barista", text: "Hej, Välkommen! Vad vill du ha?" },
        { speaker: "You", text: "Crap, I don't speak Swedish!" },
        {
          speaker: "",
          text: "Then, you remember that on the train Felix told you that Swedes speak great English. So you answer in English.",
        },
        { speaker: "You", text: "Sorry, I don't speak Swedish." },
        { speaker: "Barista", text: "No worries, what would you like?" },
      ],
    },
    {
      type: "menu-pick",
      id: "order",
      background: barista.url,
      picks: 2,
      prompt: "Pick 2 items",
      options: [
        {
          id: "kanelbullar",
          label: "Kanelbullar",
          rect: { x: 0.098, y: 0.115, w: 0.195, h: 0.185 },
          background: baristaHappy.url,
        },
        {
          id: "prinsesstarta",
          label: "Prinsesstårta",
          rect: { x: 0.308, y: 0.115, w: 0.195, h: 0.185 },
          background: baristaHappy.url,
        },
        {
          id: "pain-au-chocolat",
          label: "Pain au chocolat",
          rect: { x: 0.519, y: 0.115, w: 0.195, h: 0.185 },
          ...judging,
        },
        {
          id: "brownie",
          label: "Chocolate brownie",
          rect: { x: 0.731, y: 0.115, w: 0.195, h: 0.185 },
          ...judging,
        },
      ],
      bonusRequires: ["kanelbullar", "prinsesstarta"],
      bonusLine: { speaker: "Barista", text: "Great choices, Swedish classics!" },
      finalLines: [
        { speaker: "Barista", text: "Alright, here you go!" },
        { speaker: "", text: "You take the food." },
      ],
    },
    {
      type: "dialog",
      id: "barista-coffee",
      background: barista.url,
      lines: [
        { speaker: "Barista", text: "Would you like a coffee as well?" },
        { speaker: "You", text: "Yes, please!" },
        { speaker: "Barista", text: "How much sugar?" },
      ],
    },
    {
      type: "timing-bar",
      id: "sugar",
      background: barista.url,
      prompt: "Tap Stop in the yellow zone",
      zone: { start: 0.42, end: 0.58 },
      speedMs: 1100,
      failLine: { speaker: "Barista", text: "Hmm, that's not quite right. Let's try again." },
      successLines: [
        { speaker: "", text: "The barista hands you the coffee." },
        { speaker: "Barista", text: "Enjoy your coffee!" },
      ],
    },
  ],
};
