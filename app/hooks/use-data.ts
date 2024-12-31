import { useQuery } from "react-query";
import { Constellation, readConstellationCsv, readStarCsv, Star } from "~/puzzle/read-csv";

export function useData():
	| {
			constellations: Constellation[];
			stars: Star[];
			linesCsv: string;
	  }
	| undefined {
	const { data } = useQuery("data", async () => {
		const [constellations, stars, lines] = await Promise.all([
			fetch(`/constellations.csv`),
			fetch(`/stars.csv`),
			fetch(`/lines.csv`),
		]);
		return [await constellations.text(), await stars.text(), await lines.text()] as const;
	});
	if (!data) return data;
	const constellations = readConstellationCsv(data[0]);
	const stars = readStarCsv(data[1]);
	const linesCsv = data[2];
	return { constellations, stars, linesCsv };
}
