import { useEffect, useState } from "react";
import { z } from "zod";

const statsSchema = z.object({
	currentStreak: z.number().min(0),
	maxStreak: z.number().min(0),
	stats: z.array(z.number()).length(7),
	completed: z.boolean(),
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
		for (const key of keys) {
			const statsStr = window.localStorage.getItem("rasli_local_value_" + key) ?? "";
			let stats;
			try {
				stats = JSON.parse(statsStr);
			} catch (error) {
				stats = "";
			}
			const parsed = statsSchema.safeParse(stats);
			if (!parsed.success) {
				window.localStorage.removeItem("rasli_local_value_" + key);
			} else {
				setLocalValue((prev) => ({
					...prev,
					[key]: parsed.data,
				}));
			}
		}
	}, []);
	const updateStats = (mode: "comfy" | "unlimited", updatedStats: Stats) => {
		if (!window) return;
		window.localStorage.setItem("rasli_local_value_" + mode, JSON.stringify(updatedStats));
		setLocalValue((prev) => ({
			...prev,
			[mode]: updatedStats,
		}));
	};

	return { localValue, mount, updateStats };
}
