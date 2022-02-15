import { useState } from "react";
import { LanguageOptions } from "./LanguageOptions";

const LANGUAGES = {
  INA: "ina",
  EN: "en",
};

const DICT = {
  LABEL: {
    [LANGUAGES.INA]: "Bahasa",
    [LANGUAGES.EN]: "Language",
  },
  [LANGUAGES.INA]: "Bahasa Indonesia",
  [LANGUAGES.EN]: "English",
};


export const EnLanguageOptions = () => {
	const [lang, setLang] = useState(LANGUAGES.EN);
	const [TEXT, setTEXT] = useState({
		LABEL: DICT.LABEL[lang],
		LANGUAGES: {
			[LANGUAGES.INA]: DICT[LANGUAGES.INA] as string,
			[LANGUAGES.EN]: DICT[LANGUAGES.EN] as string,
		},
	});

	const handleChange = (lang: string) => {
		if (Object.values(LANGUAGES).includes(lang)) {
			setLang(lang);
			setTEXT(prev => ({...prev, LABEL: DICT.LABEL[lang]}));
		}
	};

	return (
		<LanguageOptions
			TEXT={TEXT}
			onChange={handleChange}
			languages={Object.values(LANGUAGES)}
			language={lang}
		/>
	);
};

export const InaLanguageOptions = () => {
	const [lang, setLang] = useState(LANGUAGES.INA);
	const [TEXT, setTEXT] = useState({
		LABEL: DICT.LABEL[lang],
		LANGUAGES: {
			[LANGUAGES.INA]: DICT[LANGUAGES.INA] as string,
			[LANGUAGES.EN]: DICT[LANGUAGES.EN] as string,
		},
	});

	const handleChange = (lang: string) => {
		if (Object.values(LANGUAGES).includes(lang)) {
			setLang(lang);
			setTEXT(prev => ({...prev, LABEL: DICT.LABEL[lang]}));
		}
	};

	return (
		<LanguageOptions
			TEXT={TEXT}
			onChange={handleChange}
			languages={Object.values(LANGUAGES)}
			language={lang}
		/>
	);
};
