import React from "react";
import Button from "@mui/material/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ButtonGroup } from "./styles";

export type ThemeBtnProps = {
	/**
	 * Text displayed on the button
	 */
	TEXT?: {
		DARK: string;
		LIGHT: string;
	};
	/**
	 * Event function to change focus between button.
	 * It fired when a non-focus button clicked.
	 * @param {string} themeMode - the theme mode being click
	 */
	onClick?: (mode: "light" | "dark") => void;
	/**
	 * mode of the theme
	 */
	mode?: "light" | "dark";
};

export function ThemeBtn({
	TEXT = { DARK: "Dark", LIGHT: "Light" },
	onClick,
	mode = "light",
}: ThemeBtnProps) {
	const handleClick = (mode: "light" | "dark") => () => onClick && onClick(mode);

	return (
		<ButtonGroup variant="contained" aria-label="outlined primary button group">
			<Button
				style={{ textTransform: "none" }}
				size="small"
				variant={mode === "light" ? "contained" : "outlined"}
				title="light-mode"
				startIcon={<Brightness7Icon />}
				onClick={handleClick("light")}
			>
				{TEXT.LIGHT}
			</Button>
			<Button
				style={{ textTransform: "none" }}
				size="small"
				variant={mode === "dark" ? "contained" : "outlined"}
				title="dark-mode"
				endIcon={<Brightness4Icon />}
				onClick={handleClick("dark")}
			>
				{TEXT.DARK}
			</Button>
		</ButtonGroup>
	);
}
