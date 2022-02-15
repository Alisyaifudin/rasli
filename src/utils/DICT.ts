import { themeTypes } from "../features/meta/metaInterface";

export const LANGUAGES = {
	INA: "ina",
	EN: "en",
};

export const LANGUAGES_NAME = {
	[LANGUAGES.INA]: "Bahasa Indonesia",
	[LANGUAGES.EN]: "English",
};

export const THEME = {
	DARK: "dark" as themeTypes,
	LIGHT: "light" as themeTypes,
};

export const GENERAL = {
	MESSAGE: {
		[LANGUAGES.INA]: "RASLI adalah game menebak rasi bintang, terinspirasi dari game wordle. Ada RASLI baru tiap harinya!",
		[LANGUAGES.EN]: "RASLI is a guessing the constelation game, inspired by wordle. A new RASLI will be available each day!",
	},
	COPYRIGHT: "© 2022 Muhammad Ali Syaifudin",
	CONTACT: "mailto:muhammad.ali.syaifudin@hotmail.com"
};

export default {
	THEME_LIGHT: {
		[LANGUAGES.INA]: "Terang",
		[LANGUAGES.EN]: "Light",
	},
	THEME_DARK: {
		[LANGUAGES.INA]: "Gelap",
		[LANGUAGES.EN]: "Dark",
	},
	LANGUAGE: {
		[LANGUAGES.INA]: "Bahasa",
		[LANGUAGES.EN]: "Language",
	},
	SETTING: {
		[LANGUAGES.INA]: "Pengaturan",
		[LANGUAGES.EN]: "Setting",
	},
  THANKS: {
    [LANGUAGES.INA]: "Terima Kasih!",
		[LANGUAGES.EN]: "Thanks!",
  },
  CONTACT_LABEL: {
    [LANGUAGES.INA]: "Masukan?",
		[LANGUAGES.EN]: "Feedback?",
  }
};
