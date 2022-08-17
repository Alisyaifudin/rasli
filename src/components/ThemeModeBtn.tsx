import React, {  useContext, useId } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { IoIosMoon } from "react-icons/io";
import { useTheme } from "next-themes";
import Toggle from "./Atom/Toggle";
import { ColorModeContext } from "~/pages/_app";

export interface ThemeModeBtnProps {
	mode: "light" | "dark";
}

export default function ThemeModeBtn() {
	const id = useId();
	const colorMode = useContext(ColorModeContext);
	const { theme, setTheme } = useTheme();
	// true means dark mode
	const handleClick = (state: boolean) => {
		const newTheme = state ? "dark" : "light"
		setTheme(newTheme);
		colorMode.toggleColorMode(newTheme);
	};

	return (
		<>
			<Toggle
				state={!theme ? false : theme === "light" ? false : true}
				LeftIcon={<IoIosMoon />}
				RightIcon={<BsFillSunFill />}
				onClick={handleClick}
				id={"theme-button-small" + id}
			/>
		</>
	);
}
