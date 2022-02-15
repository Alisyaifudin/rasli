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
};

export const constellationSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {},
});

// export const { setTheme, setLanguage, setOpenSetting } = metaSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const secretSL = (state: AppState) => state.constellation.secret;
export const allSL = (state: AppState) => state.constellation.all;

export default constellationSlice.reducer;
