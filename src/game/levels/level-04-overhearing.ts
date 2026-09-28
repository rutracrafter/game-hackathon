/** LEVEL 4 — Overhearing at fika. All story lines stay in this chapter. */
import type { Level } from "../types";
import cafe from "@/assets/fika-overhearing.png";
import bra from "@/assets/Bra.png.asset.json";

export const level04Overhearing: Level = {
  id: "level-04-overhearing",
  title: "Chapter 4",
  subtitle: "Overheard at Fika",
  scenes: [
    {
      type: "narration",
      id: "transition",
      paragraphs: [
        "As you and Felix are sitting across from each other, you overhear some people talking. You shouldn’t do this, but you start paying attention to their conversation.",
      ],
    },
    {
      type: "overhearing",
      id: "cafe-conversation",
      background: cafe,
      lines: [
        { speaker: "Person 1", text: "Hur mår du?" },
        { speaker: "Person 2", text: "Jag mår **bra**, tack!" },
        { speaker: "You", text: "Are they talking about Bras??", image: bra.url },
        { speaker: "Narrator", text: "Felix notices your confusion and explains…" },
        { speaker: "Felix", text: "What are you thinking about…" },
        { speaker: "You", text: "Nothing at all… Well… those people over there are talking about bras, kind of a random topic isn’t it?" },
        { speaker: "Felix", text: "Nooo, “bra” in Swedish means good!" },
        { speaker: "You", text: "Ohhhhhh, that makes sense…" },
        { speaker: "Narrator", text: "Back to overhearing the conversation…" },
        { speaker: "Person 1", text: "Min syster har **sex barn.**" },
        { speaker: "Person 2", text: "Oj! Hon måste ha väldigt tålamod." },
        { speaker: "You", text: "WHAAAT?? Sex Barn?!? Why would they talk about that in a coffee shop?!" },
        { speaker: "Narrator", text: "Felix once again notices your confusion and clears it up…" },
        { speaker: "Felix", text: "I’m not sure what you thinking about, but “sex” in Swedish means six and “barn” means “kids”. They were saying that their sister has six kids…" },
        { speaker: "You", text: "Oh yeah, I knew that." },
        { speaker: "Felix", text: "..." },
        { speaker: "Narrator", text: "Back to eaves dropping…" },
        { speaker: "Person 1", text: "Min pappa **dog**." },
        { speaker: "Person 2", text: "Åh nej, jag är så ledsen..." },
        { speaker: "You", text: "Aha! Swedish is similar to English after all! They’re obviously talking about their dad’s dog!" },
        { speaker: "Narrator", text: "Felix notices that you are smiling, and correctly assumes you misunderstood." },
        { speaker: "Felix", text: "..." },
        { speaker: "You", text: "What! I know what they said this time! I can speak Swedish!" },
        { speaker: "Narrator", text: "You say smiling." },
        { speaker: "Felix", text: "They said that their dad died…" },
        { speaker: "You", text: "..." },
        { speaker: "Narrator", text: "The people notice that you’re talking about them and come over to your table." },
        { speaker: "Person 1", text: "It’s not cool to eavesdrop…, and if you want to learn more Swedish you should enroll in SFI!" },
        { speaker: "Narrator", text: "They both leave a bit frustrated from your eavesdropping." },
        { speaker: "You", text: "Oh my god, that was so embarrassing." },
      ],
    },
  ],
};