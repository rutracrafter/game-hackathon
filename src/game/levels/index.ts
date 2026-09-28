/**
 * Level registry — the story progression.
 *
 * To add a level: create `level-0X-name.ts` in this folder, then add it to
 * the array below in the order it should be played.
 */
import type { Level } from "../types";
import { level01Arlanda } from "./level-01-arlanda";
import { level02ArlandaExpress } from "./level-02-arlanda-express";
import { level03Fika } from "./level-03-fika";
import { level04Overhearing } from "./level-04-overhearing";
import { level05Midsummer } from "./level-05-midsummer";
import { level06WinterShopping } from "./level-06-winter-shopping";
import { level07LongWinter } from "./level-07-long-winter";

export const levels: Level[] = [level01Arlanda, level02ArlandaExpress, level03Fika, level04Overhearing, level05Midsummer, level06WinterShopping, level07LongWinter];

export const getLevel = (index: number): Level | undefined => levels[index];
