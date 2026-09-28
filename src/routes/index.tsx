import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/game/engine/Game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lagom — Learn Swedish Culture Through Story" },
      {
        name: "description",
        content:
          "A pixel-art visual novel where each chapter teaches you a little more about Swedish culture. Chapter 1: find your friend at Arlanda airport.",
      },
      { property: "og:title", content: "Lagom — Learn Swedish Culture Through Story" },
      {
        property: "og:description",
        content:
          "A pixel-art visual novel where each chapter teaches you a little more about Swedish culture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});
