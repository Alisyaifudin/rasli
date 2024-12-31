import { cn } from "old/src/utils/cn";
import { useEffect } from "react";
import { useMode } from "~/hooks/use-mode";
import { useStatistics } from "~/hooks/use-stats";
import { capitalizeFirst } from "~/lib/utils";

export function Guess() {
	const [mode] = useMode();
	const { answers } = useStatistics(mode);
	useEffect(() => {}, [answers]);
	return (
		<ul className="mx-auto w-[100%] max-w-[200px] flex flex-col gap-1">
			{answers.map((answer, i) => (
				<li
					key={i}
					className="flex h-8 items-end justify-between border-b border-b-slate-400 pb-1 dark:border-b-zinc-600"
				>
					{answer.name ? (
						<>
							<p
								className={cn(
									"rounded-md px-1 font-bold text-white shadow-sm",
									answer.distance < 1
										? "text-green-500"
										: answer.distance < 60
										? "text-cyan-500"
										: answer.distance < 120
										? "text-orange-500"
										: "text-red-500"
								)}
							>
								{capitalizeFirst(answer.name)}
							</p>
							<p>{Math.round(answer.distance)}°</p>
						</>
					) : null}
				</li>
			))}
		</ul>
	);
}