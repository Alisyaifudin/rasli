import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { ConstellationState, constellationType, coordType } from "./constellationInterface";

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
};

export const constellationSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		addGuess: (state, action: PayloadAction<constellationType>) => {
			state.guesses.push(action.payload);
		},
		resetGuesses: (state) => {
			state.guesses = [];
		},
	},
});

export const { addGuess, resetGuesses } = constellationSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const secretSL = (state: AppState) => state.constellation.secret;
export const allSL = (state: AppState) => state.constellation.all;
export const guessesSL = (state: AppState) => state.constellation.guesses;

export default constellationSlice.reducer;
