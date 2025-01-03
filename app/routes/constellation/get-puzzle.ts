import { Constellation } from "~/lib/constellations";
import { coneFilter } from "~/puzzle/cone-filter";
import { generateLines, Star } from "~/puzzle/read-csv";

export function getPuzzle(
	constellation: Constellation,
	stars: Star[],
	rotation: number,
	zoom: number,
) {
	const center = { ra: constellation.ra, dec: constellation.dec };
	const inside = coneFilter(center, constellation.radius*zoom, rotation, stars);
	const lines = generateLines(center, rotation, constellation.name);
	return {
		name: constellation.name,
		stars: inside,
		radius: constellation.radius,
		lines: lines,
	};
}
