import { BarChart2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { useStatistics } from "~/hooks/use-stats";
import { useMode } from "~/hooks/use-mode";
import { cn } from "~/lib/utils";
import { useGraph } from "~/hooks/use-graph";

export function Graph() {
	const [mode] = useMode();
	const [open, setOpen] = useGraph();
	const { stats, currentStreak, maxStreak } = useStatistics(mode);
	const max = Math.max(...stats) || 1;
	const totalPlayed = stats.reduce((prev, curr) => prev + curr);
	const won = totalPlayed > 0 ? Math.round(((totalPlayed - stats[6]) / totalPlayed) * 100) : 0;

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<DialogTrigger asChild>
				<button>
					<BarChart2 aria-label="infographic" className="mr-2 h-6 w-6" />
				</button>
			</DialogTrigger>
			<DialogContent className="bg-white dark:bg-zinc-800">
				<DialogHeader>
					<DialogTitle>Statistik: {mode.toUpperCase()}</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-1 text-black dark:text-white">
					<div className="grid grid-cols-4 items-center gap-1">
						<p className="text-center text-2xl">{totalPlayed}</p>
						<p className="text-center text-2xl">{won}%</p>
						<p className="text-center text-2xl">{currentStreak}</p>
						<p className="text-center text-2xl">{maxStreak}</p>
						<p className="text-center text-sm">Dimainkan</p>
						<p className="text-center text-sm">Menang</p>
						<p className="text-center text-sm">Streak Saat Ini</p>
						<p className="text-center text-sm">Streak Maksimum</p>
					</div>
					<div className="flex flex-col gap-1 ">
						<DialogDescription className="text-lg font-bold text-black dark:text-white">
							DISTRIBUSI TEBAKAN
						</DialogDescription>
						<div className="flex gap-0 p-4">
							<div className="flex flex-1 flex-col items-end justify-center gap-1 pr-1">
								{stats.map((_, i) => (
									<span key={i}>{i !== 6 ? i + 1 : "L"}</span>
								))}
							</div>
							<div className="flex flex-[9] flex-col gap-1">
								{stats.map((value, i) => (
									<div key={i} style={{ width: `${10 + (value / max) * 90}%` }}>
										<div
											className={cn(
												"h-full animate-expand-witdh px-1 text-right",
												i < 6 ? "bg-indigo-500" : "bg-red-500"
											)}
										>
											<span className="animate-fade-in">{value}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
