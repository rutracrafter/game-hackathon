/**
 * Chapter 7 — The Long Winter (the ending).
 *
 * Walking home through the snow after winter shopping, the player gets
 * sleepier and sleepier, lies down "just for a minute"… and hibernates
 * straight through to summer. Good thing they bought warm clothes.
 */
import type { Level } from "../types";
import winterStreetNight from "../../assets/winter-street-night.jpg";
import midsummerMeadow from "../../assets/midsummer-meadow.jpg";
import winterFelix from "../../assets/winter-felix.png";

export const level07LongWinter: Level = {
  id: "level-07-long-winter",
  title: "Chapter 7",
  subtitle: "The Long Winter",
  scenes: [
    {
      type: "narration",
      id: "l7-intro",
      paragraphs: [
        "Bundled up in your brand-new winter gear, you and Felix walk home through the falling snow.",
      ],
      hint: "Tap to continue",
    },
    {
      type: "dialog",
      id: "l7-walk",
      background: winterStreetNight,
      character: { image: winterFelix, name: "Felix", x: 0.68, scale: 1.15 },
      lines: [
        { speaker: "Felix", text: "See? Winter in Sweden isn't so bad when you're dressed for it." },
        { speaker: "You", text: "Yeah… although… I'm getting really tired all of a sudden." },
        { speaker: "Felix", text: "That's the winter darkness. It does that to everyone. You get used to it." },
        { speaker: "You", text: "So… sleepy… maybe I'll just… rest my eyes for a second…", afterExit: true },
      ],
      hint: "Tap to continue",
    },
    {
      type: "narration",
      id: "l7-sleep",
      paragraphs: [
        "You lie down in the soft, fresh snow. Just for a minute…",
        "…",
        "Days pass. Weeks. Months.",
      ],
      hint: "Tap to continue",
    },
    {
      type: "dialog",
      id: "l7-wake",
      background: midsummerMeadow,
      character: { image: winterFelix, name: "Felix", x: 0.68, scale: 1.15 },
      lines: [
        { speaker: "You", text: "…birds? Sunlight? Wait… the snow is gone. It's summer again!" },
        { speaker: "You", text: "Did I sleep through the ENTIRE winter?!" },
        { speaker: "Felix", text: "There you are! We've been looking for you since December. Nice hibernation." },
        { speaker: "You", text: "Good thing I had these warm clothes to keep me warm during my long slumber." },
        { speaker: "Felix", text: "Very lagom of you. Now — time to enjoy the summer again!" },
      ],
      hint: "Tap to continue",
    },
    {
      type: "narration",
      id: "l7-end",
      paragraphs: [
        "The End.",
        "Tack för att du spelade! (Thanks for playing!)",
      ],
    },
  ],
};
