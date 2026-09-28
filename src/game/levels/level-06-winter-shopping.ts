/** LEVEL 6 — Winter shopping. All dialogue and outfit choices live here. */
import type { Level } from "../types";
import winterShop from "@/assets/winter-shop.jpg";
import outfitShop from "@/assets/winter-outfit-shop.jpg";
import winterFelix from "@/assets/winter-felix.png";
import blackPuffer from "@/assets/winter-black-puffer.png.asset.json";
import whiteParka from "@/assets/winter-white-parka.png.asset.json";
import redJacket from "@/assets/winter-red-jacket.png.asset.json";
import whiteScarf from "@/assets/winter-white-scarf.png.asset.json";
import blackBeanie from "@/assets/winter-black-beanie.png.asset.json";
import rainbowScarf from "@/assets/winter-rainbow-scarf.png.asset.json";
import blackBoots from "@/assets/winter-black-boots.png.asset.json";
import whiteBoots from "@/assets/winter-white-boots.png.asset.json";
import yellowSneakers from "@/assets/winter-yellow-sneakers.png.asset.json";

export const level06WinterShopping: Level = {
  id: "level-06-winter-shopping",
  title: "Chapter 6",
  subtitle: "Ready for Winter",
  scenes: [
    {
      type: "narration",
      id: "winter-transition",
      paragraphs: [
        "Summer slips away. The days grow shorter, the wind gets sharper, and your light jacket suddenly feels like a very bad decision.",
        "Felix takes one look at you shivering and declares an emergency winter-shopping trip.",
      ],
    },
    {
      type: "dialog",
      id: "winter-shop-welcome",
      background: winterShop,
      character: { image: winterFelix, name: "Felix", x: 0.73, scale: 1.2 },
      lines: [
        { speaker: "Felix", text: "Welcome to your first Swedish winter. Rule one: looking brave is not the same as being warm." },
        { speaker: "You", text: "I thought this jacket was warm." },
        { speaker: "Felix", text: "That is a cardigan with ambitions. You need layers, insulated boots, and an actual winter jacket." },
        { speaker: "You", text: "Fine. But I still want to look good." },
        { speaker: "Felix", text: "Perfect. Pick one jacket, one accessory, and one pair of boots. Swedish winter style tends to be practical and... not extremely colorful." },
      ],
    },
    {
      type: "outfit-pick",
      id: "winter-outfit",
      background: outfitShop,
      prompt: "Build your winter outfit",
      options: [
        { id: "black-puffer", label: "Black puffer", category: "jacket", tone: "neutral", image: blackPuffer.url, rect: { x: 0.034, y: 0.438, w: 0.265, h: 0.153 }, wearRect: { x: 0.404, y: 0.085, w: 0.194, h: 0.139 } },
        { id: "white-parka", label: "White parka", category: "jacket", tone: "neutral", image: whiteParka.url, rect: { x: 0.370, y: 0.432, w: 0.278, h: 0.164 }, wearRect: { x: 0.399, y: 0.083, w: 0.202, h: 0.143 } },
        { id: "red-jacket", label: "Red ski jacket", category: "jacket", tone: "colorful", image: redJacket.url, rect: { x: 0.703, y: 0.438, w: 0.263, h: 0.153 }, wearRect: { x: 0.404, y: 0.085, w: 0.194, h: 0.139 } },
        { id: "white-scarf", label: "White scarf", category: "accessory", tone: "neutral", image: whiteScarf.url, rect: { x: 0.053, y: 0.637, w: 0.219, h: 0.141 }, wearRect: { x: 0.448, y: 0.104, w: 0.105, h: 0.085 } },
        { id: "black-beanie", label: "Black beanie", category: "accessory", tone: "neutral", image: blackBeanie.url, rect: { x: 0.393, y: 0.635, w: 0.217, h: 0.132 }, wearRect: { x: 0.456, y: 0.038, w: 0.09, h: 0.085 } },
        { id: "rainbow-scarf", label: "Rainbow scarf", category: "accessory", tone: "colorful", image: rainbowScarf.url, rect: { x: 0.751, y: 0.638, w: 0.198, h: 0.140 }, wearRect: { x: 0.448, y: 0.104, w: 0.105, h: 0.085 } },
        { id: "black-boots", label: "Black boots", category: "boots", tone: "neutral", image: blackBoots.url, rect: { x: 0.055, y: 0.826, w: 0.245, h: 0.141 }, wearRect: { x: 0.430, y: 0.356, w: 0.144, h: 0.051 } },
        { id: "white-boots", label: "White boots", category: "boots", tone: "neutral", image: whiteBoots.url, rect: { x: 0.389, y: 0.827, w: 0.252, h: 0.140 }, wearRect: { x: 0.430, y: 0.356, w: 0.144, h: 0.051 } },
        { id: "yellow-sneakers", label: "Yellow sneakers", category: "boots", tone: "colorful", image: yellowSneakers.url, rect: { x: 0.706, y: 0.850, w: 0.253, h: 0.117 }, wearRect: { x: 0.430, y: 0.370, w: 0.144, h: 0.038 } },
      ],
      bonusLine: { speaker: "Felix", text: "Black and white from head to toe. Very Swedish. You already look like you know which tram to take." },
      standardLine: { speaker: "Felix", text: "Colorful! You may stand out in Stockholm, but at least we'll never lose you in a snowstorm." },
      finalLines: [
        { speaker: "You", text: "And I am actually warm. I understand winter now." },
        { speaker: "Felix", text: "Almost. One more Swedish winter essential: vitamin D. When daylight disappears, many people take a supplement." },
        { speaker: "You", text: "Warm coat, dry feet, vitamin D. Anything else?" },
        { speaker: "Felix", text: "Reflectors. It gets dark early, so being visible matters. Now you're ready for winter!" },
        { speaker: "You", text: "Bring on the snow." },
      ],
    },
  ],
};