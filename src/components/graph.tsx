import { Graph as Icon } from "~/icons/graph";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

export function Graph({ mode }: { mode: "comfy" | "unlimited" }) {
	return (
		<Dialog>
			<DialogTrigger size="icon" variant="ghost" class="rounded-full" id="graph-trigger">
				<Icon />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>
					<h2 class="text-lg font-semibold leading-none tracking-tight pt-6" id="graph-title">
						Statistik: {mode.toUpperCase()}
					</h2>
				</DialogTitle>
				<div class="overflow-y-scroll no-scrollbar h-full py-2 px-1 sm:px-8">
					<div class="grid grid-cols-4 items-center gap-1">
						<p class="text-center text-2xl" id="statistics-total-played"></p>
						<p class="text-center text-2xl" id="statistics-total-win"></p>
						<p class="text-center text-2xl" id="statistics-current-streak"></p>
						<p class="text-center text-2xl" id="statistics-max-streak"></p>
						<p class="text-center text-sm">Dimainkan</p>
						<p class="text-center text-sm">Menang</p>
						<p class="text-center text-sm">Streak Saat Ini</p>
						<p class="text-center text-sm">Streak Maksimum</p>
					</div>
					<div class="flex gap-0 p-4">
						<div class="flex flex-1 flex-col items-end justify-center gap-1 pr-1">
							{Array.from({ length: 7 }).map((_, i) => (
								<span>{i !== 6 ? i + 1 : "L"}</span>
							))}
						</div>
						<div class="flex flex-[9] flex-col gap-1" id="graph-graph"></div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
