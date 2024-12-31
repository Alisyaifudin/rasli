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
	const addAnswer = (answer: { name: string; distance: number }, name: string) => {
		context.updateStats(mode, addAnswerRaw(answer, name, statistics));
	};

	const resetPuzzle = () => {
		if (mode !== "unlimited") return;
		const resetStats = statistics;
		resetStats.answers = Array.from({ length: 6 }, () => ({ name: "", distance: 0 }));
		resetStats.completed = false;
		resetStats.seed = Math.random().toString();
		context.updateStats("unlimited", resetStats);
	};
	// {"currentStreak":0,"maxStreak":0,"stats":[0,0,0,0,0,0,2],"completed":true,"completedAt":1735659787,"answers":[{"name":"sagitta","distance":83.24248897538695},{"name":"indus","distance":134.35607339551385},{"name":"scorpius","distance":85.91796104550048},{"name":"virgo","distance":43.62624459340478},{"name":"auriga","distance":74.33432941262073},{"name":"pisces","distance":126.91142799621596}],"seed":"0.07444362572721275"}
	return {
		...statistics,
		addAnswer,
		resetPuzzle,
	};
}

function addAnswerRaw(
	answer: { name: string; distance: number },
	name: string,
	statistics: Stats
): Stats {
	const answers = statistics.answers;
	const index = answers.filter((a) => a.name !== "").length;
	if (index >= 6) return statistics;
	const now = Temporal.Now.instant().epochSeconds;
	answers[index] = answer;
	if (answer.name === name) {
		const updatedStats: Stats = { ...statistics, completed: true, completedAt: now, answers };
		return finish(index, updatedStats);
	}
	if (index === 5) {
		const updatedStats: Stats = { ...statistics, completed: true, completedAt: now, answers };
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
