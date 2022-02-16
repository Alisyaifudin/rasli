import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { ConstellationState, constellationType, coordType } from "./constellationInterface";
import DICT from "../../utils/DICT";

export const initialState: ConstellationState = {
	secret: {
		name: "Leo",
		coordinate: {
			RA: 160.93125,
			DEC: 18.10302778,
		},
		src: "/UrsaMinor.png",
	},
	all: [
		{
			name: "Leo",
			coordinate: {
				RA: 160.93125,
				DEC: 18.10302778,
			},
			src: "/UrsaMinor.png",
		},
		{
			name: "Virgo",
			coordinate: {
				RA: 198.8033333,
				DEC: -2.9245,
			},
			src: "/UrsaMinor.png",
		},
	],
	guesses: [],
	guess: "",
	error: {
		value: false,
		message: "",
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
			state.guess = action.payload;
		},
		submit: (state, action: PayloadAction<string>) => {
			// console.log(state.guess.toLowerCase());
			// console.log(state.all.map((c) => c.name.toLowerCase()));
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
			} else {
				state.error = { value: true, message: DICT.ERROR_NOT_FOUND[lang] };
			}
		},
	},
});

export const { resetGuesses, submit, setGuess } = constellationSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const secretSL = (state: AppState) => state.constellation.secret;
export const allSL = (state: AppState) => state.constellation.all;
export const guessesSL = (state: AppState) => state.constellation.guesses;
export const guessSL = (state: AppState) => state.constellation.guess;
export const errorSL = (state: AppState) => state.constellation.error;

export default constellationSlice.reducer;
