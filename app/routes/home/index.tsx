import type { MetaFunction } from "@remix-run/cloudflare";
import { useData } from "~/hooks/use-data";
import { generatePuzzle } from "~/puzzle";
import { useMode } from "~/hooks/use-mode";
import { useStatistics } from "~/hooks/use-stats";
import { Puzzle } from "./Puzzle";
import Answer from "./Answer";
import { Guess } from "./Guess";
import { Loading } from "./Loading";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	const data = useData();
	const [mode] = useMode();
	const { completed, seed } = useStatistics(mode);
	const isLoading = data === undefined;
	if (isLoading) return <Loading mode={mode} />;

	const { constellations, stars, linesCsv } = data;
	const puzzle = generatePuzzle(constellations, stars, linesCsv, seed);
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
