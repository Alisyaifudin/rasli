import { useEffect, useState } from "react";
import { z } from "zod";

export const localValueSchema = z.object({
	currentStreak: z.number().min(0),
	maxStreak: z.number().min(0),
	stats: z.array(z.number()).length(7),
	numOfGuesses: z.number().min(0).max(6),
});

type LocalValue = z.infer<typeof localValueSchema>;

export function useLocalValue(mode: "comfy" | "unlimited") {
	const key = "rasli_local_value_" + mode;
	const [localValue, setLocalValue] = useState<LocalValue>({
		currentStreak: 0,
		maxStreak: 0,
		numOfGuesses: 0,
		stats: [0, 0, 0, 0, 0, 0, 0],
	});
	const [mount, setMount] = useState(false);
	const { currentStreak, maxStreak, numOfGuesses, stats } = localValue;
	useEffect(() => {
		if (!window) return;
		setMount(true);
		const localValStr = window.localStorage.getItem(key) ?? "";
		let localVal;
		try {
			localVal = JSON.parse(localValStr);
		} catch (error) {
			localVal = "";
		}
		const parsed = localValueSchema.safeParse(localVal);
		if (!parsed.success) {
			window.localStorage.removeItem(key);
			return;
		}
		setLocalValue(parsed.data);
	}, [key]);
	const updateHistory = (num: number) => {
		if (!mount) {
			throw new Error("has not red local storage yet");
		}
		if (num < 1 || !Number.isInteger(num)) {
			throw new Error("invalid number of guesses");
		}
		let updatedLocalVal = localValue;
		if (num > 6) {
			const updatedStats = stats;
			updatedStats[6] += 1;
			updatedLocalVal = {
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
			updatedLocalVal = {
				numOfGuesses: num,
				currentStreak: updatedCurrentStreak,
				maxStreak: updatedMaxStreak,
				stats: updatedStats,
			};
		}
		setLocalValue(updatedLocalVal);
		window.localStorage.setItem(key, JSON.stringify(updateHistory));
	};

	return {
		currentStreak,
		maxStreak,
		numOfGuesses,
		stats,
		updateHistory,
	};
}
