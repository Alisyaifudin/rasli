import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setTheme, themeSL, languageSL } from "../../features/meta/metaSlice";
import { themeTypes } from "../../features/meta/metaInterface";
import { ThemeBtn as ThemeBtnProto } from "../../prototypes/ThemeBtn";
import DICT from "../../utils/DICT";

function ThemeBtn() {
	const lang = useAppSelector(languageSL);
	const mode = useAppSelector(themeSL);
	const dispatch = useAppDispatch();

	const handleClick = (mode: themeTypes) => {
		dispatch(setTheme(mode));
	};

	return (
		<ThemeBtnProto
			onClick={handleClick}
			mode={mode}
			TEXT={{ DARK: DICT.THEME_DARK[lang], LIGHT: DICT.THEME_LIGHT[lang] }}
		/>
	);
}

export default ThemeBtn;
