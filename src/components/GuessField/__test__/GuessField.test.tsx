import React from "react";
import { render, screen, fireEvent } from "../../../utils/test/reduxRender";
import GuessField from "../GuessField";
import { rgba2hex } from "../../../utils/rgba2hex";
import produce from "immer";
import { preloadedState } from "../../../app/store";
import { getColor } from "../../../utils/getColor";

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
};

const newState = produce(preloadedState, (draft) => {
	draft.constellation = initConstellationState;
	draft.constellation.guesses = [initConstellationState.all[1]];
});

describe("GuessField", () => {
	it("should render all text with correct colors and divider", () => {
		const secret = newState.constellation.secret;
		const fields: string[] = [];
		const colors: string[] = [];
		newState.constellation.guesses.forEach((guess) => {
			fields.push(guess.name);
			colors.push(getColor(guess.coordinate, secret.coordinate));
		});

		render(<GuessField />, { preloadedState: newState });
		const textEls = fields.map((field) => screen.getByText(field));
		const fieldEls = screen.getAllByTestId("field");
		const dividerEls = screen.getAllByTestId("divider");
		expect(textEls.length).toEqual(1);
		expect(fieldEls.length).toEqual(6);
		expect(dividerEls.length).toEqual(5);
		fieldEls.forEach((fieldEl, i) =>
			i < fields.length
				? expect(fieldEl).toHaveTextContent(fields[i])
				: expect(fieldEl).toHaveTextContent("")
		);
		colors.forEach((color, i) =>
			expect(rgba2hex(window.getComputedStyle(textEls[i]).color)).toBe(color)
		);
	});
});
