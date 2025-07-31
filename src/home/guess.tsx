export function Guess() {
	return (
		<ul class="mx-auto w-[100%] max-w-[200px] flex flex-col gap-1" id="guess-ul">
			{Array.from({ length: 6 }).map((_, i) => (
				<li class="flex h-8 items-end justify-between border-b border-b-slate-400 py-1 dark:border-b-zinc-600">
					<div class="bg-zinc-200 dark:bg-zinc-800 animate-pulse w-full h-[25px]"></div>
				</li>
			))}
		</ul>
	);
}
