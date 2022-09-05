import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import meta from "~/redux/metaSlice";
import game from "~/redux/gameSlice"
export const reducer = {
	meta,
	game
};

export function makeStore() {
	return configureStore({
		reducer,
	});
}

const store = makeStore();

export const preloadedState = store.getState();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action<string>
>;

export default store;
