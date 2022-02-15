import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { MetaState, themeTypes } from "./metaInterface";
import { THEME } from "../../utils/DICT";

export const initialState: MetaState = {
	theme: THEME.LIGHT,
};

export const metaSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<themeTypes>) => {
			state.theme = action.payload;
		},
	},
});

export const { setTheme } = metaSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const themeSL = (state: AppState) => state.meta.theme;

export default metaSlice.reducer;
