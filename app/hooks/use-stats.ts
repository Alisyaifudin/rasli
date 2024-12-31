import { useOutletContext } from "@remix-run/react";
import { Context, Stats } from "./use-mount-local-value";
import { Temporal } from "temporal-polyfill";
import { useGraph } from "./use-graph";
import { Mode } from "./use-mode";

export function useStatistics(mode: "comfy" | "unlimited") {
	const contextRaw = useOutletContext();
	if (typeof contextRaw !== "object" || contextRaw === null || !("mount" in contextRaw)) {
		throw new Error("useOutletContext outside the world!");
	}
	const context = contextRaw as Context;
	const statistics = context.localValue[mode];
	const [, setOpenGraph] = useGraph();
	// finish the puzzle
	// add answer
	const addAnswer = (answer: { name: string; distance: number }, name: string) => {
		context.updateStats(mode, addAnswerRaw(answer, name, statistics, setOpenGraph, mode));
	};

	const resetPuzzle = (type: "next" | "skip") => {
		if (mode !== "unlimited") return;
		const resetStats = statistics;
		resetStats.answers = Array.from({ length: 6 }, () => ({ name: "", distance: 0 }));
		resetStats.completed = false;
		resetStats.seed = Math.random().toString();
		if (type === "skip") resetStats.currentStreak = 0;
		context.updateStats("unlimited", resetStats);
	};
	return {
		...statistics,
		addAnswer,
		resetPuzzle,
	};
}

function addAnswerRaw(
	answer: { name: string; distance: number },
	name: string,
	statisticsRaw: Stats,
	setOpenGraph: (state: boolean) => void,
	mode: Mode
): Stats {
	const statistics = structuredClone(statisticsRaw);
	const answers = statistics.answers;
	const index = answers.filter((a) => a.name !== "").length;
	if (index >= 6) return statistics;
	const now = Temporal.Now.instant().epochSeconds;
	answers[index] = answer;
	if (answer.name === name) {
		const updatedStats: Stats = { ...statistics, completed: true, completedAt: now, answers };
		if (mode === "comfy") setOpenGraph(true);
		return finish(index, updatedStats);
	}
	if (index === 5) {
		const updatedStats: Stats = { ...statistics, completed: true, completedAt: now, answers };
		if (mode === "comfy") setOpenGraph(true);
		return finish(6, updatedStats);
	}
	return { ...statistics, answers };
}

function finish(index: number, statistics: Stats): Stats {
	let updatedStatistics = statistics;
	if (index >= 6) {
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
		updatedStats[index] += 1;
		updatedStatistics = {
			...statistics,
			currentStreak: updatedCurrentStreak,
			maxStreak: updatedMaxStreak,
			stats: updatedStats,
		};
	}
	return updatedStatistics;
}
