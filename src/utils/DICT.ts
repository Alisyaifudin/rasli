import { themeTypes } from "../features/meta/metaInterface";

export const LANGUAGES = {
	INA: "ina",
	EN: "en",
};

export const VERSION = "0.2.0";

export const LANGUAGES_NAME = {
	[LANGUAGES.INA]: "Bahasa Indonesia",
	[LANGUAGES.EN]: "English",
};

export const THEME = {
	DARK: "dark" as themeTypes,
	LIGHT: "light" as themeTypes,
};

export const GENERAL = {
	MESSAGES: {
		[LANGUAGES.INA]: [
			"RASLI adalah game menebak rasi bintang, terinspirasi dari game wordle. Ada RASLI baru tiap harinya!",
			`Ini adalah RASLI versi ${VERSION}`,
		],
		[LANGUAGES.EN]: [
			"RASLI is a guessing the constelation game, inspired by wordle. A new RASLI will be available each day!",
			`This is RASLI version ${VERSION}`,
		],
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
	RIGHT_COLOR: "#3d61ff",
	IAU_LIST: "https://www.iau.org/public/themes/constellations/",
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
			"Setiap tebakan adalah nama rasi bintang yang valid menurut IAU. Ketikan jawaban pada petak yang disediakan, lalu tekan JAWAB (atau tekan Enter).",
			"Setelah menjawab, tebakan akan berubah warna, bergantung seberapa dekat rasi tebakan dengan rasi rahasia.",
		],
		[LANGUAGES.EN]: [
			"Guess the RASLI in six tries. 1 day 1 secret constellation.",
			"Each guess must be a valid constellation according to IAU. Type your guess in given input space, then hit SUBMIT (or hit Enter).",
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
			"Green color means your guess is close",
		],
	},
	CONSTELLATION: {
		[LANGUAGES.INA]: "Rasi Bintang",
		[LANGUAGES.EN]: "Constellation",
	},
	INPUT: {
		[LANGUAGES.INA]: "Ketik Di Sini",
		[LANGUAGES.EN]: "Type Here",
	},
	SUBMIT: {
		[LANGUAGES.INA]: "Jawab",
		[LANGUAGES.EN]: "Submit",
	},
	ERROR_NOT_FOUND: {
		[LANGUAGES.INA]: "Tidak valid",
		[LANGUAGES.EN]: "Not valid",
	},
	ERROR_ALREADY_TRIED: {
		[LANGUAGES.INA]: "Sudah dicoba",
		[LANGUAGES.EN]: "Already tried",
	},
	WIN: {
		[LANGUAGES.INA]: "Menang!",
		[LANGUAGES.EN]: "Win!",
	},
	LOSE: {
		[LANGUAGES.INA]: "Kalah",
		[LANGUAGES.EN]: "Lose",
	},
	PLAYED: {
		[LANGUAGES.INA]: "Dimainkan",
		[LANGUAGES.EN]: "Played",
	},
	WIN_PERC: {
		[LANGUAGES.INA]: "% Menang",
		[LANGUAGES.EN]: "Win %",
	},
	CURR_STREAK: {
		[LANGUAGES.INA]: "Streak Saat Ini",
		[LANGUAGES.EN]: "Current Streak",
	},
	MAX_STREAK: {
		[LANGUAGES.INA]: "Streak Maksimum",
		[LANGUAGES.EN]: "Maximum Streak",
	},
	STATISTICS: {
		[LANGUAGES.INA]: "Statistik",
		[LANGUAGES.EN]: "Statistics",
	},
	DIST: {
		[LANGUAGES.INA]: "Distribusi Tebakan",
		[LANGUAGES.EN]: "Guess Distribution",
	},
	NEXT: {
		[LANGUAGES.INA]: "RASLI Selanjutnya",
		[LANGUAGES.EN]: "Next RASLI",
	},
};
