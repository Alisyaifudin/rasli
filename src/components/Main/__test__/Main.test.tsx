import React from "react";
import { render, screen, fireEvent } from "../../../utils/test/reduxRender";
import Main from "../Main";
import produce from "immer";
import { preloadedState } from "../../../app/store";
import { rgba2hex } from "../../../utils/rgba2hex";

const initConstellationState = {
	secret: {
		name: "Leo",
		coordinate: {
			RA: 160.93125,
			DEC: 18.10302778,
		},
		src: "/UrsaMinor.png",
	},
	all: [
		{
			name: "Leo",
			coordinate: {
				RA: 160.93125,
				DEC: 18.10302778,
			},
			src: "/UrsaMinor.png",
		},
		{
			name: "Virgo",
			coordinate: {
				RA: 198.8033333,
				DEC: -2.9245,
			},
			src: "/UrsaMinor.png",
		},
	],
	guesses: [],
	guess: "",
	error: {
		value: false,
		message: "",
	},
	status: {
		finished: false,
		win: false,
		number: 0,
	},
};

describe("Main", () => {
	it("render without crashing", () => {
		render(<Main />);
	});
	it("should render Image, guessfield, input field, and submit button", () => {
		render(<Main />);
		const imgEl = screen.getByRole("img");
		const fieldEls = screen.getAllByTestId("field");
		const inputEl = screen.getByRole("textbox");
		const submitEl = screen.getByRole("button");
		expect(imgEl).toBeInTheDocument();
		expect(fieldEls.length).toEqual(6);
		expect(inputEl).toBeInTheDocument();
		expect(submitEl).toBeInTheDocument();
	});
	it("should be able to type in input field", () => {
		render(<Main />);
		const inputEl = screen.getByRole("textbox");
		fireEvent.change(inputEl, { target: { value: "Cek Dulu" } });
		expect(inputEl).toHaveDisplayValue("Cek Dulu");
	});
	it("should be able to submit valid IAU constellations by clicking submit btn", () => {
		render(<Main />);
		const inputEl = screen.getByRole("textbox");
		const submitEl = screen.getByRole("button");
		fireEvent.change(inputEl, { target: { value: "Virgo" } });
		fireEvent.click(submitEl);
		const field1El = screen.getByText(/virgo/i);
		expect(field1El).toBeInTheDocument();
		fireEvent.change(inputEl, { target: { value: "Leo" } });
		fireEvent.click(submitEl);
		const field2Els = screen.getAllByText(/leo/i);
		expect(field2Els[1]).toBeInTheDocument();
	});
  //TODO: keyPress Enter testing, somehow, I don't know how T_T
	it("should show error 'not valid' for non-valid IAU constellations, by clicking submit button", () => {
		render(<Main />);
		const inputEl = screen.getByRole("textbox");
		const submitEl = screen.getByRole("button");
		fireEvent.change(inputEl, { target: { value: "Cek Dulu" } });
		fireEvent.click(submitEl);
		const helperEl = screen.getByText("Tidak valid");
		expect(helperEl).toBeInTheDocument();
		expect(rgba2hex(window.getComputedStyle(helperEl).color)).toBe("#d32f2f");
	});
	it("should show error 'already tried' when submitting the same answer twice", () => {
		render(<Main />);
		const inputEl = screen.getByRole("textbox");
		const submitEl = screen.getByRole("button");
		fireEvent.change(inputEl, { target: { value: "Virgo" } });
		fireEvent.click(submitEl);
		const field1El = screen.getByText(/virgo/i);
		expect(field1El).toBeInTheDocument();
		fireEvent.change(inputEl, { target: { value: "Virgo" } });
		fireEvent.click(submitEl);
		const helperEl = screen.getByText(/Sudah dicoba/i);
		expect(helperEl).toBeInTheDocument();
		expect(rgba2hex(window.getComputedStyle(helperEl).color)).toBe("#d32f2f");
	});
  it("should show you win by submitting the right answer", () => {
		render(<Main />);
		const inputEl = screen.getByRole("textbox");
		const submitEl = screen.getByRole("button");
		fireEvent.change(inputEl, { target: { value: "Leo" } });
		fireEvent.click(submitEl);
		const field2Els = screen.getAllByText(/leo/i);
		expect(field2Els.length).toEqual(2)
	});
  it("should not be able to type anything after end game", () => {
		render(<Main />);
		const inputEl = screen.getByRole("textbox");
		const submitEl = screen.getByRole("button");
		fireEvent.change(inputEl, { target: { value: "Leo" } });
		fireEvent.click(submitEl);
		const field2Els = screen.getAllByText(/leo/i);
		expect(field2Els.length).toEqual(2)
    fireEvent.change(inputEl, { target: { value: "Cek Dulu" } });
    expect(inputEl).toHaveDisplayValue("Leo");
	});
  //TODO: Add losing testing
});
