import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BasicGuessField, colors, fields } from "./GuessField.composition";

const rgba2hex = (rgba: string) =>
	`#${rgba
		.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
		.slice(1)
		.map((n, i) =>
			(i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
				.toString(16)
				.padStart(2, "0")
				.replace("NaN", "")
		)
		.join("")}`;

describe("GuessField", () => {
	it("should render all text with correct colors and divider", () => {
		render(<BasicGuessField />);
		const textEls = fields.map((field) => screen.getByText(field));
		const fieldEls = screen.getAllByTestId("field");
		const dividerEls = screen.getAllByTestId("divider");
		expect(textEls.length).toEqual(3);
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
