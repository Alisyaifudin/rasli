import { names } from "./names";

export function List() {
	return (
		<main class="m-2 mx-auto min-h-[calc(100svh-69px)] flex max-w-xl flex-col gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<h1>Daftar Rasi Bintang</h1>
			<ol class="flex flex-col">
				{names.map(([i, name]) => (
					<li value={name}>
						{i}.{" "}
						<a hx-boost="true" class="underline" href={`/constellation/${encodeURI(name)}`}>
							{name}
						</a>
					</li>
				))}
			</ol>
		</main>
	);
}
