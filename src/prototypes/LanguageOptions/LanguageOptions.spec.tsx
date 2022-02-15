import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { InaLanguageOptions, EnLanguageOptions } from './LanguageOptions.composition';
import { act } from "react-dom/test-utils";

describe("LanguageOptions", () => {
  it('should render select options', () => {
    render(<InaLanguageOptions />);
    // label in Indonesian
    const labelEls = screen.getAllByText(/^Bahasa$/g);
    const languageEl = screen.getByText(/^Bahasa Indonesia$/g);
    expect(labelEls.length).toEqual(2)
    expect(languageEl).toBeInTheDocument()
  });
  //TODO: how to test select option click? HELP T_T
});