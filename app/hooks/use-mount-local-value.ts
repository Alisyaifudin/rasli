import { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import { z } from "zod";

const statsSchema = z.object({
	currentStreak: z.number().min(0),
	maxStreak: z.number().min(0),
	stats: z.array(z.number()).length(7),
	completed: z.boolean(),
	completedAt: z.number(),
	answers: z.array(
		z.object({
			name: z.string(),
			distance: z.number(),
		})
	),
	seed: z.string(),
});

export type Stats = z.infer<typeof statsSchema>;

const localValueSchema = z.object({
	comfy: statsSchema,
	unlimited: statsSchema,
});

type LocalValue = z.infer<typeof localValueSchema>;

const defaultValue: Stats = {
	currentStreak: 0,
	maxStreak: 0,
	stats: Array.from({ length: 7 }, () => 0),
	completed: false,
	completedAt: 0,
	answers: Array.from({ length: 6 }, () => ({ name: "", distance: 0 })),
	seed: new Date().toDateString(),
};

const keys = ["comfy", "unlimited"] as const;

export type Context = {
	localValue: LocalValue;
	mount: boolean;
	updateStats: (mode: "comfy" | "unlimited", updatedStats: Stats) => void;
};

export function useMountLocalValue(): Context {
	const [localValue, setLocalValue] = useState<LocalValue>({
		comfy: defaultValue,
		unlimited: defaultValue,
	});
	const [mount, setMount] = useState(false);
	useEffect(() => {
		if (!window) return;
		setMount(true);
		const startOfDay = Temporal.Now.zonedDateTimeISO().startOfDay().epochSeconds;
		for (const key of keys) {
			const statsStr = window.localStorage.getItem("rasli_local_value_" + key) ?? "";
			let statsRaw;
			try {
				statsRaw = JSON.parse(statsStr);
			} catch (error) {
				statsRaw = "";
			}
			const parsed = statsSchema.safeParse(statsRaw);
			if (!parsed.success) {
				window.localStorage.setItem("rasli_local_value_" + key, JSON.stringify(defaultValue));
			} else {
				const statistics = parsed.data;
				if (key === "comfy" && statistics.completed && statistics.completedAt < startOfDay) {
					statistics.completed = false;
					statistics.answers = defaultValue.answers;
					statistics.seed = defaultValue.seed;
				}
				setLocalValue((prev) => ({
					...prev,
					[key]: statistics,
				}));
				window.localStorage.setItem("rasli_local_value_" + key, JSON.stringify(statistics));
			}
		}
	}, []);
	const updateStats = (mode: "comfy" | "unlimited", updatedStatistics: Stats) => {
		if (!window) return;
		// if (!updatedStatistics.completed && updatedStatistics.answers.every((a) => a.name !== "")) {
		// 	console.log(updatedStatistics);
		// }
		window.localStorage.setItem("rasli_local_value_" + mode, JSON.stringify(updatedStatistics));
		setLocalValue((prev) => ({
			...prev,
			[mode]: updatedStatistics,
		}));
	};

	return { localValue, mount, updateStats };
}
