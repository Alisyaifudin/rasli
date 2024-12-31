import { useOutletContext } from "@remix-run/react";
import { Context } from "./use-mount-local-value";

export function useStatistics(mode: "comfy" | "unlimited") {
	const contextRaw = useOutletContext();
	if (typeof contextRaw !== "object" || contextRaw === null || !("mount" in contextRaw)) {
		throw new Error("useOutletContext outside the world!");
	}
	const context = contextRaw as Context;
	const statistics = context.localValue[mode];
	const { currentStreak, maxStreak, numOfGuesses, stats } = statistics;
	const updateHistory = (num: number) => {
		if (num < 1 || !Number.isInteger(num)) {
			throw new Error("invalid number of guesses");
		}
		let updatedStatistics = statistics;
		if (num > 6) {
			const updatedStats = stats;
			updatedStats[6] += 1;
			updatedStatistics = {
				numOfGuesses: 6,
				currentStreak: 0,
				stats: updatedStats,
				maxStreak,
			};
		} else {
			const updatedCurrentStreak = currentStreak + 1;
			const updatedMaxStreak = updatedCurrentStreak > maxStreak ? updatedCurrentStreak : maxStreak;
			const updatedStats = stats;
			updatedStats[num] += 1;
			updatedStatistics = {
				numOfGuesses: num,
				currentStreak: updatedCurrentStreak,
				maxStreak: updatedMaxStreak,
				stats: updatedStats,
			};
		}
		context.updateStats(mode, updatedStatistics)
	};

	return {
		currentStreak,
		maxStreak,
		numOfGuesses,
		stats,
		updateHistory,
	};
}
