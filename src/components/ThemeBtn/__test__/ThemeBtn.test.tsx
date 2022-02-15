import React from 'react';
import { fireEvent, render, screen } from "../../../utils/test/reduxRender";
import ThemeBtn from '../ThemeBtn';

describe("ThemeModeBtn", () => {
  it('should render with the correct text', () => {
    render(<ThemeBtn />);
    const darkBtnEl = screen.getByText(/gelap/i);
    const lightBtnEl = screen.getByText(/terang/i);
    expect(darkBtnEl).toBeInTheDocument();
    expect(lightBtnEl).toBeInTheDocument();
  });
  it('should be able to click and change focus to dark button', () => {
    render(<ThemeBtn />);
    const darkBtnEl = screen.getByText(/gelap/i);
    expect(darkBtnEl).toHaveClass("MuiButton-outlined")
    fireEvent.click(darkBtnEl);
    expect(darkBtnEl).toHaveClass("MuiButton-contained")
  });
  it('should be able to click and change focus to light button', () => {
    render(<ThemeBtn />);
    const lightBtnEl = screen.getByText(/terang/i);
    const darkBtnEl = screen.getByText(/gelap/i);
    fireEvent.click(darkBtnEl);
    expect(lightBtnEl).toHaveClass("MuiButton-outlined")
    fireEvent.click(lightBtnEl);
    expect(lightBtnEl).toHaveClass("MuiButton-contained")
  });
  it('should not change focus button if the focus button clicked', () => {
    render(<ThemeBtn />);
    const lightBtnEl = screen.getByText(/terang/i);
    expect(lightBtnEl).toHaveClass("MuiButton-contained")
    fireEvent.click(lightBtnEl);
    expect(lightBtnEl).toHaveClass("MuiButton-contained")
  });
});