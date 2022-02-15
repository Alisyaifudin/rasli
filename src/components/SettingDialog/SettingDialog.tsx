import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setOpenSetting, openSettingSL, languageSL } from "../../features/meta/metaSlice";
import { SettingDialog as SettingDialogProto } from "../../prototypes/SettingDialog";
import DICT, { GENERAL } from "../../utils/DICT";
import ThemeBtn from "../ThemeBtn/ThemeBtn";
import LanguageOptions from "../LanguageOptions/LanguageOptions";

function SettingDialog() {
	const lang = useAppSelector(languageSL);
	const open = useAppSelector(openSettingSL);
	const dispatch = useAppDispatch();

	const handleClick = () => dispatch(setOpenSetting(true));
	const handleClose = () => dispatch(setOpenSetting(false));

	const TEXT = useMemo(
		() => ({
			TITLE: DICT.SETTING[lang],
			MESSAGE: GENERAL.MESSAGE[lang],
			COPYRIGHT: GENERAL.COPYRIGHT,
			CONTACT: GENERAL.CONTACT,
			CONTACT_LABEL: DICT.CONTACT_LABEL[lang],
			THANKS: DICT.THANKS[lang],
		}),
		[lang]
	);
	return (
		<SettingDialogProto
			onClick={handleClick}
			onClose={handleClose}
			open={open}
			ThemeBtn={<ThemeBtn />}
			LanguageOptions={<LanguageOptions />}
			TEXT={TEXT}
		/>
	);
}

export default SettingDialog;
