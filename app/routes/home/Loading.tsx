import { Input } from "~/components/ui/input";
import { Mode } from "~/hooks/use-mode";

export function Loading({ mode }: { mode: Mode }) {
	return (
		<main className="m-2 mx-auto min-h-[calc(100svh-72px)] flex max-w-xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<div className="bg-zinc-200 dark:bg-zinc-800 animate-pulse h-[32px] w-[128px]"></div>
			<div className="flex aspect-square w-full xs:w-[70%] p-0">
				<div className="block w-full rounded-full bg-zinc-500 h-full animate-pulse"></div>
			</div>
			<div className="flex flex-col items-center gap-2">
				<p className="text-sm">&nbsp;</p>
				<Input disabled type="text" />
				<div className="h-[36px] w-[160px] bg-zinc-200 dark:bg-zinc-800 animate-pulse">
				</div>
			</div>
      <ul className="mx-auto w-[100%] max-w-[200px] flex flex-col gap-1">
				{Array.from({ length: 6 }).map((_, i) => (
					<li
						key={i}
						className="flex h-8 items-end justify-between border-b border-b-slate-400 py-1 dark:border-b-zinc-600"
					>
						<div className="bg-zinc-200 dark:bg-zinc-800 animate-pulse w-full h-[25px]"></div>
					</li>
				))}
			</ul>
		</main>
	);
}
