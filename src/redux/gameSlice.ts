import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModeType = 'comfy' | 'unlimited';

export interface GameState {
  done: boolean;
  win: boolean;
  date: string;
  day: number;
  name: string;
  answers: {
    name: string;
    quality: number;
  }[];
  error: string;
  stats: {
    played: number;
    win: number;
    winrate: number;
    streak: number;
    longest_streak: number;
  };
  last_played: {
    day: number;
    number: number;
  }
  dist: number[];
}

const initialState: GameState = {
  done: false,
  win: false,
  date: new Date().toISOString(),
  name: '',
  error: '',
  day: -1,
  stats: {
    played: 0,
    win: 0,
    winrate: 0,
    streak: 0,
    longest_streak: 0,
  },
  last_played: {
    day: -1,
    number: -1,
  },
  dist: Array(6).fill(0),
  answers: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<GameState['stats']>) => {
      state.stats = action.payload;
    },
    setDist: (state, action: PayloadAction<number[]>) => {
      state.dist = action.payload;
    },
    setLastPlayed: (state, action: PayloadAction<GameState['last_played']>) => {
      state.last_played = action.payload;
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
    setAnswers: (
      state,
      action: PayloadAction<{ name: string; quality: number }[]>,
    ) => {
      state.answers = action.payload;
    },
    setDay: (state, action: PayloadAction<number>) => {
      state.day = action.payload;
    },
  },
});

export const {
  setName,
  resetAnswers,
  resetError,
  setWin,
  setError,
  setAnswers,
  setDay,
  setDist,
  setLastPlayed,
  setStats
} = gameSlice.actions;

export default gameSlice.reducer;
