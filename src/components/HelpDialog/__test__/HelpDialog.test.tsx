import React from "react";
import { render, screen, fireEvent } from "../../../utils/test/reduxRender";
import HelpDialog from "../HelpDialog";
import { act } from "react-dom/test-utils";
import DICT, { GENERAL, LANGUAGES } from "../../../utils/DICT";

const lang = LANGUAGES.INA;

function userClick(element) {
	act(() => {
		fireEvent.mouseDown(element);
		fireEvent.mouseUp(element);
		fireEvent.click(element);
	});
}

describe("HelpDialog", () => {
	it("should render gear btn", () => {
		render(<HelpDialog />);
		const btnEl = screen.getByTestId("HelpIcon");
		expect(btnEl).toBeInTheDocument();
	});
	it("should be able to click ? btn", () => {
		render(<HelpDialog />);
		const btnEl = screen.getByTestId("HelpIcon");
		fireEvent.click(btnEl);
		const dialogEl = screen.getByRole("dialog");
		const titleEl = screen.getByText(DICT.HELP_TITLE[lang]);
		const howtoEl = screen.getByText(DICT.HOWTO[lang][0]);
		const exampleEl = screen.getByText(DICT.EXAMPLE[lang]);
		const guessEl = screen.getByText(GENERAL.EX_GUESS_AND_COLOR[0].GUESS);
		const hintEl = screen.getByText(DICT.EX_HINT[lang][0]);
		const dividerEls = screen.getAllByTestId("divider");
		expect(dialogEl).toBeInTheDocument();
		expect(titleEl).toBeInTheDocument();
		expect(howtoEl).toBeInTheDocument();
		expect(exampleEl).toBeInTheDocument();
		expect(guessEl).toBeInTheDocument();
		expect(hintEl).toBeInTheDocument();
		expect(dividerEls.length).toEqual(2);
	});
	it("should be able to close dialog by clicking away", () => {
		jest.useFakeTimers();
		render(<HelpDialog />);
		const btnEl = screen.getByTestId("HelpIcon");
		userClick(btnEl);
		const dialogEl = screen.getByRole("dialog");
		const backdropEl = dialogEl.parentElement;
		userClick(backdropEl);
		act(() => {
			jest.runAllTimers();
		});
		expect(dialogEl).not.toBeInTheDocument();
	});
	it("should be able to close dialog by clicking X", () => {
		jest.useFakeTimers();
		render(<HelpDialog />);
		const btnEl = screen.getByTestId("HelpIcon");
		userClick(btnEl);
		const dialogEl = screen.getByRole("dialog");
		const cancelEl = screen.getByTestId("CloseIcon");
		userClick(cancelEl);
		act(() => {
			jest.runAllTimers();
		});
		expect(dialogEl).not.toBeInTheDocument();
	});
});
