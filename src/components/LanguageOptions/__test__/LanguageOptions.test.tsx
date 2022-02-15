import React from "react";
import { render, screen, fireEvent } from "../../../utils/test/reduxRender";
import LanguageOptions from "../LanguageOptions";

describe("LanguageOptions", () => {
	it("should render select options", () => {
		render(<LanguageOptions />);
		// label in Indonesian
		const labelEls = screen.getAllByText(/^Bahasa$/g);
		const languageEl = screen.getByText(/^Bahasa Indonesia$/g);
		expect(labelEls.length).toEqual(2);
		expect(languageEl).toBeInTheDocument();
	});
	// TODO: how to test select option click? HELP T_T
});
