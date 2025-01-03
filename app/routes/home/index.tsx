import type { MetaFunction } from "@remix-run/cloudflare";
import { useGetStars } from "~/hooks/use-get-stars";
import { generatePuzzle } from "~/puzzle";
import { useMode } from "~/hooks/use-mode";
import { useStatistics } from "~/hooks/use-stats";
import { Puzzle } from "./Puzzle";
import Answer from "./Answer";
import { Guess } from "./Guess";
import { Loading } from "./Loading";
import { constellations } from "~/lib/constellations";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	const stars = useGetStars();
	const [mode] = useMode();
	const { completed, seed } = useStatistics(mode);
	const isLoading = stars === undefined;
	if (isLoading) return <Loading mode={mode} />;

	const puzzle = generatePuzzle(constellations, stars, seed);
	const name = completed ? puzzle.name : "Misteri";
	return (
		<main className="m-2 mx-auto min-h-[calc(100svh-72px)] flex max-w-xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<p className="text-2xl font-bold">{name}</p>
			<Puzzle puzzle={puzzle} completed={completed} />
			<Answer name={puzzle.name} constellations={constellations} />
			<Guess />
		</main>
	);
}
