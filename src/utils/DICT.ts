import { themeTypes } from "../features/meta/metaInterface"

export const LANGUAGES = {
  INA: "ina",
  EN: "en"
}

export const LANGUAGES_NAME = {
  [LANGUAGES.INA]: "Bahasa Indonesia",
  [LANGUAGES.EN]: "English",
}

export const THEME = {
  DARK: "dark" as themeTypes,
  LIGHT: "light"  as themeTypes
}

export default {
  THEME_LIGHT: {
    [LANGUAGES.INA]: "Terang",
    [LANGUAGES.EN]: "Light"
  },
  THEME_DARK: {
    [LANGUAGES.INA]: "Gelap",
    [LANGUAGES.EN]: "Dark"
  },
  LANGUAGE: {
    [LANGUAGES.INA]: "Bahasa",
    [LANGUAGES.EN]: "Language"
  },
}