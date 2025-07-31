import { random } from "../share/random.js";
import {
	coneFilter,
	generateLines,
	Line,
	type Constellation,
	type LineRaw,
	type Star,
} from "../share/sky.js";
import type { LocalData } from "./local-data.js";
import type { Mode } from "./mode.js";
import type { StarData } from "./stars-data.js";

type PuzzleData = {
	name: string;
	stars: {
		x: number;
		y: number;
		c: string;
		s: number;
		hd: number;
	}[];
	radius: number;
	lines: Line[];
};

export class Puzzle {
	puzzle: { comfy: PuzzleData; unlimited: PuzzleData } | null = null;
	constructor(private mode: Mode, private starsData: StarData, private localData: LocalData) {}
	get() {
		const mode = this.mode.get();
		if (this.puzzle !== null) return this.puzzle[mode];
		const { stars, constellations, lines } = this.starsData.get();
		const localData = this.localData.get();
		const puzzleComfy = this.generate(stars, localData["comfy"].seed, constellations, lines);
		const puzzleUnlimited = this.generate(
			stars,
			localData["unlimited"].seed,
			constellations,
			lines
		);
		this.puzzle = {
			comfy: puzzleComfy,
			unlimited: puzzleUnlimited,
		};
		return this.puzzle[mode];
	}
	set(p: PuzzleData, mode: "comfy" | "unlimited") {
		if (this.puzzle === null) throw new Error("no puzzle yet");
		this.puzzle[mode] = p;
	}
	generate(stars: Star[], seed: string, constellations: Constellation[], linesRaw: LineRaw[]) {
		const r = Math.round(random(seed) * 10000) % 89;
		const constellation = constellations[r];
		const center = { ra: constellation.ra, dec: constellation.dec };
		const rotation = random(seed) * 2 * Math.PI;
		const inside = coneFilter(center, constellation.radius, rotation, stars);
		const lines = generateLines(center, rotation, constellation.name, linesRaw);
		return {
			name: constellation.name,
			stars: inside,
			radius: constellation.radius,
			lines: lines,
		};
	}
}
