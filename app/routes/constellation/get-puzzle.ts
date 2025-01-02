import { Constellation } from "~/lib/constellations";
import { coneFilter } from "~/puzzle/cone-filter";
import { readLineCsv, Star } from "~/puzzle/read-csv";

export function getPuzzle(
	constellation: Constellation,
	stars: Star[],
	lineCsv: string,
	rotation: number,
	zoom: number,
) {
	const center = { ra: constellation.ra, dec: constellation.dec };
	const inside = coneFilter(center, constellation.radius*zoom, rotation, stars);
	const lines = readLineCsv(lineCsv, center, rotation, constellation.name);
	return {
		name: constellation.name,
		stars: inside,
		radius: constellation.radius,
		lines: lines,
	};
}
