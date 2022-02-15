import React from "react";
import { render, screen, fireEvent } from "../../../utils/test/reduxRender";
import ThemeProvider from "../ThemeProvider";
import { rgb2hsv, fromRGBFuncString2rgb } from "../../../utils/colorconversion";
import produce from "immer";
import { preloadedState } from "../../../app/store";
import { THEME } from "../../../utils/DICT";
import ThemeBtn from "../../../components/ThemeBtn/ThemeBtn";

const MockChildren = () => {
	return <div data-testid="children">Test</div>;
};

const newState = produce(preloadedState, (draftState) => {
	draftState.meta.theme = THEME.DARK;
});

describe("Theme", () => {
	describe("unit test", () => {
		it("check background color light mode", () => {
			//Render sample children given them provider
			render(<ThemeProvider children={<MockChildren />} />);
			// get css baseline element
			const childrenEl = screen.getByTestId("css-baseline");
			//compute its background color
			const backgroundColor = window
				.getComputedStyle(childrenEl)
				.getPropertyValue("background-color");
			//get its value of hsv color
			const { v } = rgb2hsv(fromRGBFuncString2rgb(backgroundColor));
			// check if its bright enough
			expect(v).toBeGreaterThan(0.5);
		});
		it("check background color dark mode", () => {
			//Render sample children given them provider with dark mode state
			render(<ThemeProvider children={<MockChildren />} />, {
				preloadedState: newState,
			});
			// get css baseline element
			const childrenEl = screen.getByTestId("css-baseline");
			//compute its background color
			const backgroundColor = window
				.getComputedStyle(childrenEl)
				.getPropertyValue("background-color");
			//get its value of hsv color
			const { v } = rgb2hsv(fromRGBFuncString2rgb(backgroundColor));
			// check if its dark enough
			expect(v).toBeLessThan(0.5);
		});
	});
	describe("integration test", () => {
		it("change to dark mode from light mode", () => {
			//Render sample children given theme provider
			render(<ThemeProvider children={<ThemeBtn />} />);
			//get dark mode btn
			const darkBtnEl = screen.getByTitle("dark-mode");
			// get css baseline element
			const childrenEl = screen.getByTestId("css-baseline");
			//compute its background color before clicking dark btn
			const backgroundColorBefore = window
				.getComputedStyle(childrenEl)
				.getPropertyValue("background-color");
			//get its value of hsv color
			const { v: v1 } = rgb2hsv(fromRGBFuncString2rgb(backgroundColorBefore));
			//click darkmode btn
			fireEvent.click(darkBtnEl);
			//compute its background color after clicking dark btn
			const backgroundColorAfter = window
				.getComputedStyle(childrenEl)
				.getPropertyValue("background-color");
			//get its value of hsv color
			const { v: v2 } = rgb2hsv(fromRGBFuncString2rgb(backgroundColorAfter));
			// check if background color get darker
			expect(v1).toBeGreaterThan(v2);
		});
		it("change to light mode from dark mode", () => {
			//Render sample children given theme provider with dark mode state
			render(<ThemeProvider children={<ThemeBtn />} />, {
				preloadedState: newState,
			});
			//get light mode btn
			const lightBtnEl = screen.getByTitle("light-mode");
			// get css baseline element
			const childrenEl = screen.getByTestId("css-baseline");
			//compute its background color before clicking light btn
			const backgroundColorBefore = window
				.getComputedStyle(childrenEl)
				.getPropertyValue("background-color");
			//get its value of hsv color
			const { v: v1 } = rgb2hsv(fromRGBFuncString2rgb(backgroundColorBefore));
			//click lightmode btn
			fireEvent.click(lightBtnEl);
			//compute its background color after clicking light btn
			const backgroundColorAfter = window
				.getComputedStyle(childrenEl)
				.getPropertyValue("background-color");
			//get its value of hsv color
			const { v: v2 } = rgb2hsv(fromRGBFuncString2rgb(backgroundColorAfter));
			//check if background color get lighter
			expect(v1).toBeLessThan(v2);
		});
		it("does not change theme mode when the theme is light and click light btn", async () => {
			//Render sample children given theme provider
			render(<ThemeProvider children={<ThemeBtn />} />);
			//get light mode btn
			const lightBtnEl = screen.getByTitle("light-mode");
			// get css baseline element
			const childrenEl = screen.getByTestId("css-baseline");
			//compute its background color before clicking light btn
			const backgroundColorBefore = window
				.getComputedStyle(childrenEl)
				.getPropertyValue("background-color");
			//get its value of hsv color
			const { v: v1 } = rgb2hsv(fromRGBFuncString2rgb(backgroundColorBefore));
			//click lightmode btn
			fireEvent.click(lightBtnEl);
			//compute its background color after clicking light btn
			const backgroundColorAfter = window
				.getComputedStyle(childrenEl)
				.getPropertyValue("background-color");
			//get its value of hsv color
			const { v: v2 } = rgb2hsv(fromRGBFuncString2rgb(backgroundColorAfter));
			//background color should'n change
			expect(v1).toBe(v2);
		});
	});
});
