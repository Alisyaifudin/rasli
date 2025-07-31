import type { infer as zInfer } from "zod";
import { z } from "../share/zod.js";
import { generateRandomString } from "../share/utils.js";

const COMFY_KEY = "rasli_local_value_comfy";
const UNLIMITED_KEY = "rasli_local_value_unlimited";

const localDataSchema = z.object({
	answers: z.array(
		z.object({
			distance: z.number(),
			name: z.string(),
		})
	),
	completed: z.boolean(),
	completedAt: z.number(),
	currentStreak: z.number(),
	maxStreak: z.number(),
	seed: z.string(),
	stats: z.array(z.number()),
});

type Local = zInfer<typeof localDataSchema>;

export class LocalData {
	localData: null | { comfy: Local; unlimited: Local } = null;
	constructor() {
		let lsComfy: any = window.localStorage.getItem(COMFY_KEY);
		try {
			lsComfy = lsComfy === null ? null : JSON.parse(lsComfy);
		} catch (error) {
			console.error(error);
			lsComfy = null;
		}
		let lsUnlimited: any = window.localStorage.getItem(UNLIMITED_KEY);
		try {
			lsUnlimited = lsUnlimited === null ? null : JSON.parse(lsUnlimited);
		} catch (error) {
			console.error(error);
			lsUnlimited = null;
		}

		type LocalData = zInfer<typeof localDataSchema>;
		const comfyParsed = localDataSchema.safeParse(lsComfy);
		const unlimitedParsed = localDataSchema.safeParse(lsUnlimited);

		const emptyData: LocalData = {
			answers: [],
			completedAt: 0,
			completed: false,
			currentStreak: 0,
			maxStreak: 0,
			seed: new Date().toDateString(),
			stats: Array.from({ length: 7 }).map(() => 0),
		};

		const localData = {
			comfy: emptyData,
			unlimited: emptyData,
		};
		const randomSeed = generateRandomString(16);
		localData.unlimited.seed = randomSeed;

		if (!comfyParsed.success) {
			localStorage.setItem(COMFY_KEY, JSON.stringify(emptyData));
		} else {
			localData.comfy = comfyParsed.data;
			const now = new Date().toDateString();
			if (now !== localData.comfy.seed) {
				localData.comfy.seed = now;
				localData.comfy.answers = [];
				localData.comfy.completed = false;
			}
		}

		if (!unlimitedParsed.success) {
			localStorage.setItem(UNLIMITED_KEY, JSON.stringify(emptyData));
		} else {
			localData.unlimited = unlimitedParsed.data;
		}
		this.localData = localData;
	}
	get() {
		if (this.localData === null) throw new Error("No local data");
		return this.localData;
	}
	set(mode: "comfy" | "unlimited", data: { comfy: Local; unlimited: Local }) {
		const KEY = mode === "comfy" ? COMFY_KEY : UNLIMITED_KEY;
		localStorage.setItem(KEY, JSON.stringify(data[mode]));
		this.localData = data;
	}
}

// let localData: null | { comfy: LocalData; unlimited: LocalData } = null;

// export function getLocalData() {
// 	if (localData !== null) return localData;

// 	let lsComfy: any = window.localStorage.getItem(COMFY_KEY);
// 	try {
// 		lsComfy = lsComfy === null ? null : JSON.parse(lsComfy);
// 	} catch (error) {
// 		console.error(error);
// 		lsComfy = null;
// 	}
// 	let lsUnlimited: any = window.localStorage.getItem(UNLIMITED_KEY);
// 	try {
// 		lsUnlimited = lsUnlimited === null ? null : JSON.parse(lsUnlimited);
// 	} catch (error) {
// 		console.error(error);
// 		lsUnlimited = null;
// 	}

// 	type LocalData = zInfer<typeof localDataSchema>;

// 	const comfyParsed = localDataSchema.safeParse(lsComfy);
// 	const unlimitedParsed = localDataSchema.safeParse(lsUnlimited);

// 	const emptyData: LocalData = {
// 		answers: [],
// 		completedAt: 0,
// 		completed: false,
// 		currentStreak: 0,
// 		maxStreak: 0,
// 		seed: new Date().toDateString(),
// 		stats: Array.from({ length: 7 }).map(() => 0),
// 	};

// 	localData = {
// 		comfy: emptyData,
// 		unlimited: emptyData,
// 	};
// 	const randomSeed = generateRandomString(16);
// 	localData.unlimited.seed = randomSeed;

// 	if (!comfyParsed.success) {
// 		localStorage.setItem(COMFY_KEY, JSON.stringify(emptyData));
// 	} else {
// 		localData.comfy = comfyParsed.data;
// 		const now = new Date().toDateString();
// 		if (now !== localData.comfy.seed) {
// 			localData.comfy.seed = now;
// 			localData.comfy.answers = [];
// 			localData.comfy.completed = false;
// 		}
// 	}

// 	if (!unlimitedParsed.success) {
// 		localStorage.setItem(UNLIMITED_KEY, JSON.stringify(emptyData));
// 	} else {
// 		localData.unlimited = unlimitedParsed.data;
// 	}
// 	return localData;
// }

// export type Data = ReturnType<typeof getLocalData>;

// export function setLocalData(mode: "comfy" | "unlimited", data: Data) {
// 	const KEY = mode === "comfy" ? COMFY_KEY : UNLIMITED_KEY;
// 	localStorage.setItem(KEY, JSON.stringify(data[mode]));
// }
