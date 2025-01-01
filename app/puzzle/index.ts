import { random } from "~/lib/utils";
import { Constellation, readLineCsv, Star } from "./read-csv";
import { coneFilter } from "./cone-filter";

export function generatePuzzle(
	constellations: Constellation[],
	stars: Star[],
	lineCsv: string,
	seed: string
) {
	const r = Math.round(random(seed) * 10000) % 88;
	const constellation = constellations[r];
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
