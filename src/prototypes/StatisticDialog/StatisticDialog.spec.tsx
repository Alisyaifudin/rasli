import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BasicHelpDialog } from "./StatisticDialog.composition";
import { act } from "react-dom/test-utils";

function userClick(element) {
	act(() => {
		fireEvent.mouseDown(element);
		fireEvent.mouseUp(element);
		fireEvent.click(element);
	});
}

describe("HelpDialog", () => {
	it("should render gear btn", () => {
		render(<BasicHelpDialog />);
		const btnEl = screen.getByTestId("HelpIcon");
		expect(btnEl).toBeInTheDocument();
	});
	it("should be able to click ? btn", () => {
		render(<BasicHelpDialog />);
		const btnEl = screen.getByTestId("HelpIcon");
		fireEvent.click(btnEl);
		const dialogEl = screen.getByRole("dialog");
		const titleEl = screen.getByText(/cara bermain/i);
		const howtoEl = screen.getByText(/tebak RASLI/i);
		const exampleEl = screen.getByText(/contoh/i);
		const guessEl = screen.getByText(/puppis/i);
		const hintEl = screen.getByText(/warna merah/i);
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
		render(<BasicHelpDialog />);
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
		render(<BasicHelpDialog />);
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
