import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { constellations } from "~/lib/constellations";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	return (
		<main className="m-2 mx-auto min-h-[calc(100svh-72px)] flex max-w-xl flex-col gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<h1>Daftar Rasi Bintang</h1>
			<ol className="flex flex-col">
				{constellations.map((c, i) => (
					<li key={c.name} value={c.name}>
						{i + 1}.{" "}
						<Link
							prefetch="intent"
							className="underline"
							to={`/constellation/${encodeURI(c.name)}`}
						>
							{c.name}
						</Link>
					</li>
				))}
			</ol>
		</main>
	);
}
