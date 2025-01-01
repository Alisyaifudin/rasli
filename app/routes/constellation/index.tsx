import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { useData } from "~/hooks/use-data";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	const data = useData();
	const isLoading = data === undefined;

	if (isLoading)
		return (
			<main className="m-2 mx-auto min-h-[calc(100svh-72px)] flex max-w-xl flex-col gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
				<h1>Daftar Rasi Bintang</h1>
				<ol className="flex flex-col">
					{Array.from({ length: 89 }).map((_, i) => (
						<li key={i} className="h-[24px] w-full flex items-center">
							{i + 1}.{" "}
							<span className="h-[20px] w-[100px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></span>
						</li>
					))}
				</ol>
			</main>
		);
	const constellations = data.constellations;

	return (
		<main className="m-2 mx-auto min-h-[calc(100svh-72px)] flex max-w-xl flex-col gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<h1>Daftar Rasi Bintang</h1>
			<ol className="flex flex-col">
				{/* <li className="h-[24px] w-full flex items-center">
					{0}. <div className="h-[20px] w-[100px] bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
				</li> */}
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
