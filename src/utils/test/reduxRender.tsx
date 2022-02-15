// test-utils.jsx
import React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import your own reducer
import store, { AppState, reducer } from "../../app/store";

type reduxRenderOptions = RenderOptions & {
	preloadedState?: AppState;
	store?: typeof store;
};

function render(
	ui: React.ReactElement,
	{
		preloadedState,
		store = configureStore({ reducer: reducer, preloadedState }),
		...renderOptions
	}: reduxRenderOptions = {}
) {
	function Wrapper({ children }: { children: React.ReactNode }) {
		return (
				<Provider store={store}>{children}</Provider>
		);
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
