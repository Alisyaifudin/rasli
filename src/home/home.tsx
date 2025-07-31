import { Answer } from "./answer";
import { Guess } from "./guess";
import { Puzzle } from "./puzzle";

export function Home() {
	return (
		<main class="m-2 mx-auto min-h-[calc(100svh-69px)] flex max-w-xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<Puzzle />
			<Answer />
			<Guess />
			<script src="/scripts/puzzle.js" type="module"></script>
		</main>
	);
}
