/**
 * LEVEL 1 — Arrival at Arlanda.
 *
 * All dialog text for this level lives here. Edit freely: changing text,
 * adding characters or adding scenes does not require touching the engine.
 */
import type { Level } from "../types";

import background from "@/assets/Arlanda_Background.png.asset.json";
import billy from "@/assets/Billy.png.asset.json";
import oscar from "@/assets/Oscar.png.asset.json";
import jens from "@/assets/Jens.png.asset.json";
import felix from "@/assets/Pewdiepie.png.asset.json";

export const level01Arlanda: Level = {
  id: "level-01-arlanda",
  title: "Chapter 1",
  subtitle: "Arrival at Arlanda",
  scenes: [
    {
      type: "narration",
      id: "intro",
      paragraphs: [
        "You have finally arrived in Sweden, the flight was exhausting but you made it! Felix, a friend who you met online is here to pick you up. The only problem is, you don't know what he looks like as you have only talked online. Let's find Felix!",
      ],
      hint: "Tap to continue",
    },
    {
      type: "find-character",
      id: "find-felix",
      background: background.url,
      characters: [
        {
          id: "billy",
          name: "Billy",
          image: billy.url,
          x: 0.18,
          scale: 1,
          lines: [
            {
              speaker: "Probably Not a Swede",
              text: "Howdy there! Oh, your name is also Mike?! That's my brother's name and I'm here to pick him up. Enjoy your time in Sweden!",
            },
            {
              speaker: "You",
              text: "Whoops, looks like that wasn't the guy I'm looking for.",
              afterExit: true,
            },
          ],
        },
        {
          id: "oscar",
          name: "Oscar",
          image: oscar.url,
          x: 0.5,
          scale: 1,
          lines: [
            {
              speaker: "Swedish-Looking Guy",
              text: "You don't look like the Mike I know… Am I Swedish? How dare you! I am Danish!",
            },
            {
              speaker: "You",
              text: "Oh no, I didn't mean to offend him! But it seems that he wasn't who I'm looking for.",
              afterExit: true,
            },
          ],
        },
        {
          id: "jens",
          name: "Jens",
          image: jens.url,
          x: 0.83,
          scale: 1.2,
          lines: [
            {
              speaker: "Grisch Guy",
              text: "Hello there! I am indeed Swedish, but I think you have the wrong person. I'm waiting for my friend. By the way, isn't this a cool fit?!",
            },
            {
              speaker: "You",
              text: "Yeah it's pretty cool actually.",
            },
            {
              speaker: "You",
              text: "Huh, nice guy but it seems he was not the right person.",
              afterExit: true,
            },
          ],
        },
      ],
      finalCharacter: {
        id: "felix",
        name: "Felix",
        image: felix.url,
        x: 0.5,
        scale: 1.15,
        lines: [
          {
            speaker: "Felix",
            text: "How's it going bro, I'm peeewdiepie! Great to see you! Sorry for the delay, traffic was a bit more than expected. Welcome to Sweden and let's get going!",
          },
        ],
      },
    },
  ],
};
