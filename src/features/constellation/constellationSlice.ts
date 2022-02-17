import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { ConstellationState, constellationType, coordType } from "./constellationInterface";
import DICT from "../../utils/DICT";
import { list } from "../../utils/list";
import { random } from "../../utils/random";

const cstIndex = Math.floor(random(new Date().getDate().toString())*89)

export const initialState: ConstellationState = {
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
};

export const constellationSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		resetGuesses: (state) => {
			state.guesses = [];
		},
		setGuess: (state, action: PayloadAction<string>) => {
			if(state.status.finished) return;
			state.guess = action.payload;
		},
		submit: (state, action: PayloadAction<string>) => {
			if(state.status.finished) return;
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
				if (state.guess.toLowerCase() === state.secret.name.toLowerCase())
					state.status = { finished: true, win: true, number: state.guesses.length + 1 };
				else if ((state.guesses.length === 6))
					state.status = { finished: true, win: false, number: state.guesses.length + 1 };
				state.guess = "";
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
export const statusSL = (state: AppState) => state.constellation.status;

export default constellationSlice.reducer;
