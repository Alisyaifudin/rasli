import { useOutletContext } from "@remix-run/react";
import { Context, Stats } from "./use-mount-local-value";
import { Temporal } from "temporal-polyfill";

export function useStatistics(mode: "comfy" | "unlimited") {
	const contextRaw = useOutletContext();
	if (typeof contextRaw !== "object" || contextRaw === null || !("mount" in contextRaw)) {
		throw new Error("useOutletContext outside the world!");
	}
	const context = contextRaw as Context;
	const statistics = context.localValue[mode];

	// finish the puzzle
	// add answer
	const addAnswer = (answer: string, name: string) => {
		context.updateStats(mode, addAnswerRaw(answer, name, statistics));
	};

	return {
		...statistics,
		addAnswer,
	};
}

function addAnswerRaw(answer: string, name: string, statistics: Stats): Stats {
	const answers = statistics.answers;
	if (answers.length >= 6) return statistics;
	answers.push(answer);
	const now = Temporal.Now.instant().epochSeconds;
	if (answer === name) {
		const updatedStats: Stats = { ...statistics, completed: true, lastAnswerAt: now, answers };
		return finish(answers.length, updatedStats);
	}
	if (answers.length === 6) {
		const updatedStats: Stats = { ...statistics, completed: true, lastAnswerAt: now, answers };
		return finish(7, updatedStats);
	}
	return { ...statistics, lastAnswerAt: now, answers };
}

function finish(num: number, statistics: Stats): Stats {
	let updatedStatistics = statistics;
	if (num > 6) {
		const updatedStats = statistics.stats;
		updatedStats[6] += 1;
		updatedStatistics = {
			...statistics,
			currentStreak: 0,
			stats: updatedStats,
		};
	} else {
		const updatedCurrentStreak = statistics.currentStreak + 1;
		const updatedMaxStreak =
			updatedCurrentStreak > statistics.maxStreak ? updatedCurrentStreak : statistics.maxStreak;
		const updatedStats = statistics.stats;
		updatedStats[num] += 1;
		updatedStatistics = {
			...statistics,
			currentStreak: updatedCurrentStreak,
			maxStreak: updatedMaxStreak,
			stats: updatedStats,
		};
	}
	return updatedStatistics;
}
