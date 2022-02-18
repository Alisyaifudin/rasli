import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { MetaState, themeTypes } from "./metaInterface";
import { THEME, LANGUAGES } from "../../utils/DICT";

const genesis = new Date("2022/2/17")
const today = new Date().getDate() - genesis.getDate()

export const initialState: MetaState = {
	theme: THEME.DARK,
	languages: [LANGUAGES.EN, LANGUAGES.INA],
	language: LANGUAGES.INA,
	openSetting: false,
	openHelp: false,
	openStatistics: false,
	number: today
};

export const metaSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<themeTypes>) => {
			state.theme = action.payload;
		},
		setLanguage: (state, action: PayloadAction<string>) => {
			if (state.languages.includes(action.payload)) state.language = action.payload;
		},
		openStatistics: (state) => {
			state.openStatistics = true;
		},
		setOpen: (state, action: PayloadAction<{ type: string; value: boolean }>) => {
			const { type, value } = action.payload;
			switch (type) {
				case "setting": {
					state.openSetting = value;
					break;
				}
				case "help": {
					state.openHelp = value;
					break;
				}
				case "statistics": {
					state.openStatistics = value;
					break;
				}
			}
		},
	},
});

export const { setTheme, setLanguage, setOpen, openStatistics } = metaSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const themeSL = (state: AppState) => state.meta.theme;
export const languageSL = (state: AppState) => state.meta.language;
export const languagesSL = (state: AppState) => state.meta.languages;
export const openSettingSL = (state: AppState) => state.meta.openSetting;
export const openHelpSL = (state: AppState) => state.meta.openHelp;
export const openStatisticsSL = (state: AppState) => state.meta.openStatistics;
export const numberSL = (state: AppState) => state.meta.number;

export default metaSlice.reducer;
