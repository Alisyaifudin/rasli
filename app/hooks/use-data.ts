import { useQuery } from "react-query";
import { readStarCsv, Star } from "~/puzzle/read-csv";

export function useData():
	| {
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
	const stars = readStarCsv(data[1]);
	const linesCsv = data[2];
	return { stars, linesCsv };
}
