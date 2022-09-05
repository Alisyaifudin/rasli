import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModeType = 'comfy' | 'unlimited';

export interface MetaState {
  mode: ModeType;
  version: string;
  ready: boolean
}

const initialState: MetaState = {
  mode: 'comfy',
  version: '0.3.0',
  ready: false,
};

export const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<ModeType>) => {
      state.mode = action.payload;
    },
    setReady: (state, action: PayloadAction<boolean>) => {
      state.ready = action.payload;
    }

  },
});

export const {
  changeMode,
  setReady,
} = metaSlice.actions;

export default metaSlice.reducer;
