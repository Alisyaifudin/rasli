import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	
	return (
		<main className="m-2 mx-auto min-h-[calc(100svh-72px)] flex max-w-xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<ul>
				<li><Link to="/">Game</Link></li>
			</ul>
		</main>
	);
}
