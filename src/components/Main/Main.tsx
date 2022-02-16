import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { languageSL } from "../../features/meta/metaSlice";
import {
	secretSL,
	errorSL,
	guessSL,
	submit,
	setGuess,
	statusSL,
} from "../../features/constellation/constellationSlice";
import GuessField from "../GuessField/GuessField";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DICT from "../../utils/DICT";
import { Typography } from "@mui/material";

function Main() {
	const dispatch = useAppDispatch();
	const lang = useAppSelector(languageSL);
	const secret = useAppSelector(secretSL);
	const guess = useAppSelector(guessSL);
	const error = useAppSelector(errorSL);
	const status = useAppSelector(statusSL);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		dispatch(setGuess(event.target.value));

	const handleClick = () => dispatch(submit(lang));
	const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) =>
		e.key === "Enter" && dispatch(submit(lang));
	return (
		<Container maxWidth="sm">
			<Paper sx={{ height: "90vh" }}>
				<Stack alignItems="center" sx={{ gap: "20px", height: "100%" }}>
					<div style={{ flexGrow: 1 }} />
					{status.finished && (
						<Typography component="h2" variant="h4">
							{secret.name}
						</Typography>
					)}
					<div style={{ width: "100%", height: "300px", position: "relative" }}>
						<Image
							src={secret.src}
							layout="fill"
							alt={DICT.CONSTELLATION[lang]}
							objectFit="contain"
						/>
					</div>
					<GuessField />
					{status.finished &&
						(status.win ? (
							<Typography>🎉 {DICT.WIN[lang]} 🎉</Typography>
						) : (
							<Typography>{DICT.LOSE[lang]} T_T</Typography>
						))}
					<TextField
						value={guess}
						onChange={handleChange}
						label={DICT.INPUT[lang]}
						variant="filled"
						sx={{ width: "50%" }}
						error={error.value}
						helperText={error.message}
						onKeyPress={handleKeyPress}
					/>
					<Button onClick={handleClick} variant="outlined">
						{DICT.SUBMIT[lang]}
					</Button>
					<div style={{ flexGrow: 1 }} />
				</Stack>
			</Paper>
		</Container>
	);
}

export default Main;
