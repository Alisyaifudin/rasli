import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BasicSettingDialog, dummy } from "./SettingDialog.composition";
import { act } from "react-dom/test-utils";

function userClick(element) {
	act(() => {
		fireEvent.mouseDown(element);
		fireEvent.mouseUp(element);
		fireEvent.click(element);
	});
}

describe("SettingDialog", () => {
	it("should render gear btn", () => {
		render(<BasicSettingDialog />);
		const btnEl = screen.getByTestId("SettingsIcon");
		expect(btnEl).toBeInTheDocument();
	});
	it("should be able to click gear btn", () => {
		render(<BasicSettingDialog />);
		const btnEl = screen.getByTestId("SettingsIcon");
		fireEvent.click(btnEl);
		const dialogEl = screen.getByRole("dialog");
		const titleEl = screen.getByText(/pengaturan/i);
		const themeEl = screen.getByText(/tema/i);
		const languageOptionsEl = screen.getByText(/bahasa/i);
		const messageEl = screen.getByText(dummy);
		const contactLabelEl = screen.getByText(/masukan\?/i);
		const contactEl = screen.getByText(/email/i);
		const copyrightEl = screen.getByText(/© 2022/);
		expect(dialogEl).toBeInTheDocument();
		expect(titleEl).toBeInTheDocument();
		expect(themeEl).toBeInTheDocument();
		expect(languageOptionsEl).toBeInTheDocument();
		expect(messageEl).toBeInTheDocument();
		expect(contactLabelEl).toBeInTheDocument();
		expect(contactEl).toBeInTheDocument();
	});
	it("should be able to close dialog by clicking away", () => {
		jest.useFakeTimers();
		render(<BasicSettingDialog />);
		const btnEl = screen.getByTestId("SettingsIcon");
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
		render(<BasicSettingDialog />);
		const btnEl = screen.getByTestId("SettingsIcon");
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
