import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModeType = "comfy" | "unlimited"

export interface MetaState {
	mode: ModeType;
	version: string;
	done: boolean;
	date: string;
	name: string;
}

const initialState: MetaState = {
	mode: "comfy",
	version: "0.3.0",
	done: false,
	date: new Date().toISOString(),
	name: "uwu"
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
		},
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		}
	},
});

export const { changeMode, setDone, setName } = metaSlice.actions;

export default metaSlice.reducer;
