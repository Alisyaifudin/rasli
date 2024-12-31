import { random } from "~/lib/utils";
import { readConstellationCsv, readLineCsv, readStarCsv } from "./read-csv";
import { coneFilter } from "./cone-filter";

export function generatePuzzle(
	constellationsCsv: string,
	starsCsv: string,
	lineCsv: string,
	seed: string
) {
	// const today = new Date();
	// const date = today.toDateString();
	// const seed = mode === "comfy" ? date : Math.random().toString();
	const r = Math.round(random(seed) * 10000) % 89;
	const constellations = readConstellationCsv(constellationsCsv);
	const constellation = constellations[r];
	const stars = readStarCsv(starsCsv);
	const center = { ra: constellation.ra, dec: constellation.dec };

	const rotation = random(seed) * 2 * Math.PI;
	const inside = coneFilter(center, constellation.radius, rotation, stars);
	const lines = readLineCsv(lineCsv, center, rotation, constellation.name);
	return {
		name: constellation.name,
		stars: inside,
		radius: constellation.radius,
		lines: lines,
	};
}
