import { useQuery } from "react-query";

export function useData(): readonly [string, string, string] | undefined {
	const { data } = useQuery("data", async () => {
		const [constellation, stars, lines] = await Promise.all([
			fetch(`/constellations.csv`),
			fetch(`/stars.csv`),
			fetch(`/lines.csv`),
		]);
		return [await constellation.text(), await stars.text(), await lines.text()] as const;
	});

	return data;
}
