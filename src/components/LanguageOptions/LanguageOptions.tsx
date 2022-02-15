import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { languageSL, languagesSL, setLanguage } from "../../features/meta/metaSlice";
import { LanguageOptions as LanguageOptionsProto } from "../../prototypes/LanguageOptions";
import DICT, { LANGUAGES, LANGUAGES_NAME } from "../../utils/DICT";

export default function LanguageOptions() {
	const lang = useAppSelector(languageSL);
	const languages = useAppSelector(languagesSL);
	const dispatch = useAppDispatch();
	const TEXT = useMemo(
		() => ({
			LABEL: DICT.LANGUAGE[lang],
			LANGUAGES: {
				[LANGUAGES.INA]: LANGUAGES_NAME[LANGUAGES.INA],
				[LANGUAGES.EN]: LANGUAGES_NAME[LANGUAGES.EN],
			},
		}),
		[lang]
	);

	const handleChange = (lang: string) => dispatch(setLanguage(lang));

	return (
		<LanguageOptionsProto
			onChange={handleChange}
			TEXT={TEXT}
			language={lang}
			languages={languages}
		/>
	);
}
