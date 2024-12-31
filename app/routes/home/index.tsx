import type { MetaFunction } from "@remix-run/cloudflare";
import { Title } from "./Title";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	return (
		<main className="m-2 mx-auto min-h-[100svh] flex max-w-4xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<Title />
			{/* <Puzzle mode={mode} mounted={mounted} />
			<Answer mode={mode} mounted={mounted} />
			<Guess mode={mode} mounted={mounted} /> */}
		</main>
	);
}
