import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModeType = 'comfy' | 'unlimited';

export interface MetaState {
  mode: ModeType;
  version: string;
  done: boolean;
  win: boolean;
  date: string;
  name: string;
  answers: string[];
  error: string;
}

const initialState: MetaState = {
  mode: 'comfy',
  version: '0.3.0',
  done: false,
  win: false,
  date: new Date().toISOString(),
  name: 'uwu',
  answers: [],
  error: '',
};

export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    setDone: (state, action: PayloadAction<boolean>) => {
      state.done = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    resetAnswers: (state) => {
      state.answers = Array(5).fill('');
    },
    resetError: (state) => {
      state.error = '';
    },
    setWin: (state, action: PayloadAction<boolean>) => {
      state.win = action.payload;
      state.done = true;
    },
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setAnswers: (state, action: PayloadAction<string[]>) => {
			state.answers = action.payload;
		}
  },
});

export const {
  changeMode,
  setDone,
  setName,
  resetAnswers,
  resetError,
  setWin,
	setError,
	setAnswers
} = metaSlice.actions;

export default metaSlice.reducer;
