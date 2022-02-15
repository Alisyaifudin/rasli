import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { MetaState, themeTypes } from "./metaInterface";
import { THEME, LANGUAGES } from "../../utils/DICT";

export const initialState: MetaState = {
	theme: THEME.LIGHT,
	languages: [LANGUAGES.EN, LANGUAGES.INA],
	language: LANGUAGES.INA
};

export const metaSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<themeTypes>) => {
			state.theme = action.payload;
		},
		setLanguage: (state, action: PayloadAction<string>) => {
			if(state.languages.includes(action.payload)) state.language = action.payload
		},
	},
});

export const { setTheme, setLanguage } = metaSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const themeSL = (state: AppState) => state.meta.theme;
export const languageSL = (state: AppState) => state.meta.language;
export const languagesSL = (state: AppState) => state.meta.languages;

export default metaSlice.reducer;
