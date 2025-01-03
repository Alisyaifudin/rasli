import { useQuery } from "react-query";
import { readStarCsv, Star } from "~/puzzle/read-csv";

export function useGetStars(): Star[] | undefined {
	const { data } = useQuery("data", async () => {
		const stars = await fetch(`/stars.csv`);
		return await stars.text();
	});
	if (!data) return undefined;
	const stars = readStarCsv(data);
	return stars;
}
