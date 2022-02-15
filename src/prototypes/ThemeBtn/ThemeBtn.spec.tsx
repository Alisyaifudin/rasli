import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LightButton, DarkButton } from './ThemeBtn.composition';

describe("ThemeModeBtn", () => {
  it('should render with the correct text', () => {
    render(<LightButton />);
    const darkBtnEl = screen.getByText("Dark");
    const lightBtnEl = screen.getByText("Light");
    expect(darkBtnEl).toBeInTheDocument();
    expect(lightBtnEl).toBeInTheDocument();
  });
  it('should be able to click and change focus to dark button', () => {
    render(<LightButton />);
    const darkBtnEl = screen.getByText("Dark");
    expect(darkBtnEl).toHaveClass("MuiButton-outlined")
    fireEvent.click(darkBtnEl);
    expect(darkBtnEl).toHaveClass("MuiButton-contained")
  });
  it('should be able to click and change focus to light button', () => {
    render(<DarkButton />);
    const lightBtnEl = screen.getByText("Light");
    expect(lightBtnEl).toHaveClass("MuiButton-outlined")
    fireEvent.click(lightBtnEl);
    expect(lightBtnEl).toHaveClass("MuiButton-contained")
  });
  it('should not change focus button if the focus button clicked', () => {
    render(<LightButton />);
    const lightBtnEl = screen.getByText("Light");
    expect(lightBtnEl).toHaveClass("MuiButton-contained")
    fireEvent.click(lightBtnEl);
    expect(lightBtnEl).toHaveClass("MuiButton-contained")
  });
});