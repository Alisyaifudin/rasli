import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { ConstellationState, constellationType, statisticsType, statusType } from "./constellationInterface";
import DICT from "../../utils/DICT";
import { list } from "../../utils/list";
import { random } from "../../utils/random";
import produce from "immer";

const cstIndex = Math.floor(random(new Date().getDate().toString()) * 89);
const genesis = new Date("2022/2/17")
const today = new Date().getDate() - genesis.getDate()

export const initialState: ConstellationState = {
	number: today,
	secret: list[cstIndex],
	all: list,
	guesses: [],
	guess: "",
	error: {
		value: false,
		message: "",
	},
	status: {
		finished: false,
		win: false,
		number: 0,
	},
	statistics: {
		lastGame: 0,
		played: 0,
		win: 0,
		lastRound: false,
		winPerc: 0,
		currStreak: 0,
		maxStreak: 0,
		dist: [
			{ name: "1", number: 0, length: 1 },
			{ name: "2", number: 0, length: 1 },
			{ name: "3", number: 0, length: 1 },
			{ name: "4", number: 0, length: 1 },
			{ name: "5", number: 0, length: 1 },
			{ name: "6", number: 0, length: 1 },
		],
	},
};

export const constellationSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		resetGuesses: (state) => {
			state.guesses = [];
		},
		setGuess: (state, action: PayloadAction<string>) => {
			if (state.status.finished) return;
			state.guess = action.payload;
		},
		setStatistics: (state, action: PayloadAction<statisticsType>) => {
			if(action.payload) state.statistics = action.payload;
		},
		setStatus: (state, action: PayloadAction<statusType>) => {
			if(action.payload) state.status = action.payload;
		},
		setGuesses: (state, action: PayloadAction<constellationType[]>) => {
			if(action.payload) state.guesses = action.payload;
		},
		submit: (state, action: PayloadAction<string>) => {
			if (state.status.finished) return;
			const lang = action.payload;
			const index = state.all
				.map((c) => c.name.toLowerCase())
				.findIndex((name) => name === state.guess.toLowerCase());
			if (
				state.guesses.map((guess) => guess.name.toLowerCase()).includes(state.guess.toLowerCase())
			) {
				state.error = { value: true, message: DICT.ERROR_ALREADY_TRIED[lang] };
			} else if (index !== -1) {
				state.error = { value: false, message: "" };
				state.guesses.push(state.all[index]);
				// WIN
				if (state.guess.toLowerCase() === state.secret.name.toLowerCase()) {
					state.status = { finished: true, win: true, number: state.guesses.length };
					state.statistics = produce(state.statistics, (draft) => {
						draft.winPerc = Math.floor(((draft.win + 1) / (draft.played+1)) * 100);
						draft.played += 1;
						draft.win += 1;
						if (draft.lastRound && draft.maxStreak < draft.currStreak + 1)
							draft.maxStreak = draft.currStreak + 1;
						draft.currStreak += 1;
						draft.dist = draft.dist.map(d => state.guesses.length.toString() === d.name ? {...d, number: d.number+1} : d)
						draft.lastRound = true;
						draft.lastGame = state.number;
					});
				}
				// LOSE
				else if (state.guesses.length === 6) {
					state.status = { finished: true, win: false, number: state.guesses.length };
					state.statistics = produce(state.statistics, (draft) => {
						draft.winPerc = Math.floor(((draft.win ) / (draft.played+1)) * 100);
						draft.played += 1;
						draft.currStreak = 0;
						draft.lastRound = false
						draft.lastGame = state.number;
					});
				}
				// NEXT
				state.guess = "";
			} else {
				state.error = { value: true, message: DICT.ERROR_NOT_FOUND[lang] };
			}
		},
	},
});

export const { resetGuesses, submit, setGuess, setStatistics, setStatus, setGuesses } = constellationSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const secretSL = (state: AppState) => state.constellation.secret;
export const allSL = (state: AppState) => state.constellation.all;
export const guessesSL = (state: AppState) => state.constellation.guesses;
export const guessSL = (state: AppState) => state.constellation.guess;
export const errorSL = (state: AppState) => state.constellation.error;
export const statusSL = (state: AppState) => state.constellation.status;
export const statisticsSL = (state: AppState) => state.constellation.statistics;
export const numberSL = (state: AppState) => state.constellation.number;

export default constellationSlice.reducer;
