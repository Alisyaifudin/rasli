import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BasicStatisticDialog } from "./StatisticDialog.composition";
import { act } from "react-dom/test-utils";

function userClick(element: HTMLElement) {
	act(() => {
		fireEvent.mouseDown(element);
		fireEvent.mouseUp(element);
		fireEvent.click(element);
	});
}

describe("StatisticDialog", () => {
	it("should render bar icon btn", () => {
		render(<BasicStatisticDialog />);
		const btnEl = screen.getByTestId("BarChartIcon");
		expect(btnEl).toBeInTheDocument();
	});
	it("should be able to click the btn", () => {
		render(<BasicStatisticDialog />);
		const btnEl = screen.getByTestId("BarChartIcon");
		fireEvent.click(btnEl);
		const dialogEl = screen.getByRole("dialog");
		const titleEl = screen.getByText(/statistik/i);
		const statEl = screen.getByText(/dimainkan/i);
		const distEl = screen.getByText(/distribusi tebakan/i);
		const nextEl = screen.getByText(/rasli berikutnya/i);
		const shareEl = screen.getByText(/share/i);
		expect(dialogEl).toBeInTheDocument();
		expect(titleEl).toBeInTheDocument();
		expect(statEl).toBeInTheDocument();
		expect(distEl).toBeInTheDocument();
		expect(nextEl).toBeInTheDocument();
		expect(shareEl).toBeInTheDocument();
	});
	it("should be able to close dialog by clicking away", () => {
		jest.useFakeTimers();
		render(<BasicStatisticDialog />);
		const btnEl = screen.getByTestId("BarChartIcon");
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
		render(<BasicStatisticDialog />);
		const btnEl = screen.getByTestId("BarChartIcon");
		userClick(btnEl);
		const dialogEl = screen.getByRole("dialog");
		const cancelEl = screen.getByTestId("CloseIcon");
		userClick(cancelEl);
		act(() => {
			jest.runAllTimers();
		});
		expect(dialogEl).not.toBeInTheDocument();
	});
	it("should be able to click share", () => {
		jest.useFakeTimers();
		render(<BasicStatisticDialog />);
		const btnEl = screen.getByTestId("BarChartIcon");
		const textEl = screen.getByText(/text/i)
		userClick(btnEl);
		const shareEl = screen.getByText(/share/i);
		userClick(shareEl);
		expect(textEl).toHaveTextContent("shared")
	});
});
