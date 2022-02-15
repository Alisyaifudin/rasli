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
		[LANGUAGES.INA]:
			"RASLI adalah game menebak rasi bintang, terinspirasi dari game wordle. Ada RASLI baru tiap harinya!",
		[LANGUAGES.EN]:
			"RASLI is a guessing the constelation game, inspired by wordle. A new RASLI will be available each day!",
	},
	COPYRIGHT: "© 2022 Muhammad Ali Syaifudin",
	CONTACT: "mailto:muhammad.ali.syaifudin@hotmail.com",
	EX_GUESS_AND_COLOR: [
		{
			GUESS: "PUPPIS",
			COLOR: "#ff4f4f",
		},
		{
			GUESS: "LEO",
			COLOR: "#ffbb00",
		},
		{
			GUESS: "DRACO",
			COLOR: "#54ff6b",
		},
	],
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
	},
	HELP_TITLE: {
		[LANGUAGES.INA]: "Cara Bermain",
		[LANGUAGES.EN]: "How To Play",
	},
	HOWTO: {
		[LANGUAGES.INA]: [
			"Tebak RASLI dalam 6 kesempatan. 1 hari ada 1 rasi rahasia.",
			"Setiap tebakan adalah nama rasi bintang yang valid menurut IAU. Ketikan jawaban pada petak yang disediakan, lalu tekan JAWAB.",
			"Setelah menjawab, tebakan akan berubah warna, bergantung seberapa dekat rasi tebakan dengan rasi rahasia.",
		],
		[LANGUAGES.EN]: [
			"Guess the RASLI in six tries. 1 day 1 secret constellation.",
			"Each guess must be a valid constellation according to IAU. Type your guess in given input space, then hit ANSWER.",
			"After each guess, the color of your guess will change, depending to how close your guess to the secret constellation.",
		],
	},
	EXAMPLE: {
		[LANGUAGES.INA]: "Contoh",
		[LANGUAGES.EN]: "Example",
	},
	EX_HINT: {
		[LANGUAGES.INA]: [
			"Warna merah menunjukkan rasi tebakan terlalu jauh",
			"Warna jingga menunjukkan rasi tebakan agak jauh",
			"Warna hijau menunjukkan rasi tebakan sudah dekat",
		],
		[LANGUAGES.EN]: [
			"Red color means your guess is too far",
			"Orange color means your guess is kind of far",
			"Green color means your guess is near",
		],
	},
	CONSTELLATION: {
		[LANGUAGES.INA]: "Rasi Bintang",
		[LANGUAGES.EN]: "Constellation",
	},
};
