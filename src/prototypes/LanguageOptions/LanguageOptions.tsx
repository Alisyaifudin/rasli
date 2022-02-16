import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export type LanguageOptionsProps = {
	/**
	 * Languages options
	 */
	languages: string[];
	/**
	 * selected language
	 */
	language: string;
	/**
	 * Label text
	 */
	TEXT: {
		LABEL: string;
		LANGUAGES: {
			[x: string]: string;
		};
	};
	/**
	 * onChange listener when clicked
	 */
	onChange: (lang: string) => void;
};

export function LanguageOptions({ language, languages, TEXT, onChange }: LanguageOptionsProps) {
	const handleChange = (event: SelectChangeEvent) => onChange && onChange(event.target.value);

	return (
		<Box sx={{ minWidth: 180 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">{TEXT.LABEL}</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={language}
					label={TEXT.LABEL}
					onChange={handleChange}
				>
					{languages.map((lang) => (
						<MenuItem key={lang} value={lang}>
							{TEXT.LANGUAGES[lang]}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
}
