import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModeType = "comfy" | "unlimited"

export interface MetaState {
	mode: ModeType;
	version: string;
	done: boolean;
	date: Date;
}

const initialState: MetaState = {
	mode: "comfy",
	version: "0.3.0",
	done: false,
	date: new Date(),
};

export const metaSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		changeMode: (state, action: PayloadAction<ModeType>) => {
			state.mode = action.payload
		},
		setDone: (state, action: PayloadAction<boolean>) => {
			state.done = action.payload
		}
	},
});

export const { changeMode, setDone } = metaSlice.actions;

export default metaSlice.reducer;
