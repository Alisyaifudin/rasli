import type { MetaFunction } from "@remix-run/cloudflare";
import { Title } from "./Title";
import { useData } from "~/dal/get-data";
import { generatePuzzle } from "~/puzzle/generate-puzzle";
import { useMode } from "~/hooks/use-mode";
import { useStatistics } from "~/hooks/use-stats";
import { Temporal } from "temporal-polyfill";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	const data = useData();
	const [mode] = useMode();
	const { completedAt } = useStatistics(mode);
	const startOfDay = Temporal.Now.zonedDateTimeISO().startOfDay().epochSeconds;
	const isLoading = data === undefined;
	if (isLoading)
		return (
			<main className="m-2 mx-auto min-h-[100svh] flex max-w-4xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
				<Title />
			</main>
		);
	const puzzle = generatePuzzle(data[0], data[1], data[2], mode);
	const name = completedAt > startOfDay ? puzzle.name : "Misteri";
	console.log(puzzle);
	return (
		<main className="m-2 mx-auto min-h-[100svh] flex max-w-4xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<Title name={name} />
			{/* <Puzzle mode={mode} mounted={mounted} />
			<Answer mode={mode} mounted={mounted} />
			<Guess mode={mode} mounted={mounted} /> */}
		</main>
	);
}
