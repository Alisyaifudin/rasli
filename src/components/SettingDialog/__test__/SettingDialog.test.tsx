import React from "react";
import { render, screen, fireEvent } from "../../../utils/test/reduxRender";
import SettingDialog from "../SettingDialog";
import { act } from "react-dom/test-utils";
import DICT, { GENERAL, LANGUAGES, LANGUAGES_NAME } from "../../../utils/DICT";

const lang = LANGUAGES.INA

function userClick(element) {
	act(() => {
		fireEvent.mouseDown(element);
		fireEvent.mouseUp(element);
		fireEvent.click(element);
	});
}

describe("SettingDialog", () => {
	it("should render gear btn", () => {
		render(<SettingDialog />);
		const btnEl = screen.getByTestId("SettingsIcon");
		expect(btnEl).toBeInTheDocument();
	});
	it("should be able to click gear btn", () => {
		render(<SettingDialog />);
		const btnEl = screen.getByTestId("SettingsIcon");
		fireEvent.click(btnEl);
		const dialogEl = screen.getByRole("dialog");
		const titleEl = screen.getByText(DICT.SETTING[lang]);
		const themeEl = screen.getByText(DICT.THEME_DARK[lang]);
		const languageOptionsEl = screen.getByText(LANGUAGES_NAME[lang]);
		const messageEl = screen.getByText(GENERAL.MESSAGES[lang]);
		const contactLabelEl = screen.getByText(DICT.CONTACT_LABEL[lang]);
		const contactEl = screen.getByText(/email/i);
		const copyrightEl = screen.getByText(GENERAL.COPYRIGHT);
		const thanksEl = screen.getByText(DICT.THANKS[lang]);
		expect(dialogEl).toBeInTheDocument();
		expect(titleEl).toBeInTheDocument();
		expect(themeEl).toBeInTheDocument();
		expect(languageOptionsEl).toBeInTheDocument();
		expect(messageEl).toBeInTheDocument();
		expect(contactLabelEl).toBeInTheDocument();
		expect(contactEl).toBeInTheDocument();
		expect(copyrightEl).toBeInTheDocument();
		expect(thanksEl).toBeInTheDocument();
	});
	it("should be able to close dialog by clicking away", () => {
		jest.useFakeTimers();
		render(<SettingDialog />);
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
		render(<SettingDialog />);
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
