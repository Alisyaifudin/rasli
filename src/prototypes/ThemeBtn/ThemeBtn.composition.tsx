import React, { useState } from "react";
import { ThemeBtn } from "./ThemeBtn";

export const LightButton = () => {
	const [mode, setMode] = useState<"light" | "dark">("light");

	const handleClick = (mode: "light" | "dark") => setMode(mode);

	return <ThemeBtn mode={mode} onClick={handleClick} />;
};
export const DarkButton = () => {
	const [mode, setMode] = useState<"light" | "dark">("dark");

	const handleClick = (mode: "light" | "dark") => setMode(mode);

	return <ThemeBtn mode={mode} onClick={handleClick} />;
};
