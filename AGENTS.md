<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Game content architecture
- Story content lives in `src/game/levels/level-XX-*.ts` (one isolated file per level, all dialog text inline) and is stitched together by the ordered array in `src/game/levels/index.ts`; the engine in `src/game/engine/` never hardcodes story text, so new levels need no engine changes.
- New interaction kinds are added as a variant of the `Scene` union in `src/game/types.ts` plus a renderer dispatched in `src/game/engine/Game.tsx`.
- Preload chapter scene images in `Game.tsx` when a chapter starts, so narration gives the browser time to decode artwork before the visual scene appears.
- Outfit shopping uses the reusable `outfit-pick` scene with one replaceable choice per category, so later clothing chapters remain data-driven.
