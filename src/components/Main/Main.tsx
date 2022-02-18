import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { languageSL, openStatistics } from "../../features/meta/metaSlice";
import {
	secretSL,
	errorSL,
	guessSL,
	submit,
	setGuess,
	statusSL,
	setStatistics,
	statisticsSL,
	setStatus,
	guessesSL,
	setGuesses,
} from "../../features/constellation/constellationSlice";
import GuessField from "../GuessField/GuessField";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DICT from "../../utils/DICT";
import { Typography } from "@mui/material";
// Import any actions required for transformations.
import { Cloudinary } from "@cloudinary/url-gen";
import { max } from "@cloudinary/url-gen/actions/roundCorners";
import { crop, fill } from "@cloudinary/url-gen/actions/resize";
import { byAngle } from "@cloudinary/url-gen/actions/rotate";
import { random } from "../../utils/random";
import produce from "immer";
import { calcLength } from "../../utils/calcLength";

function Main() {
	const cld = new Cloudinary({
		cloud: {
			cloudName: "aleksandria",
		},
	});

	const dispatch = useAppDispatch();
	const lang = useAppSelector(languageSL);
	const secret = useAppSelector(secretSL);
	const guess = useAppSelector(guessSL);
	const error = useAppSelector(errorSL);
	const status = useAppSelector(statusSL);
	const statistics = useAppSelector(statisticsSL);
	const guesses = useAppSelector(guessesSL);
	const url = useMemo(() => {
		const myImage = cld.image(secret.src);
		const angle = Math.floor(random(new Date().toUTCString()) * 360);
		let alpha = angle;
		if (alpha > 270) alpha -= 270;
		else if (alpha > 180) alpha -= 180;
		else if (alpha > 90) alpha -= 90;
		const ratio = 1 / (Math.sin((alpha * Math.PI) / 180) + Math.cos((alpha * Math.PI) / 180));
		myImage.resize(fill(700)).rotate(byAngle(angle));
		if (![0, 90, 180, 270].includes(angle)) myImage.resize(crop(ratio));
		myImage.roundCorners(max());
		return myImage.toURL();
	}, [secret]);
	//useEffect
	useEffect(() => {
		const initStatistics = window.localStorage.getItem("statistics");
		const initStatus = window.localStorage.getItem("status");
		const initGuesses = window.localStorage.getItem("guesses");
		if (initStatistics && initGuesses && initStatus) {
			dispatch(setStatistics(JSON.parse(initStatistics)));
			dispatch(setStatus(JSON.parse(initStatus)));
			dispatch(setGuesses(JSON.parse(initGuesses)));
		}else{
			window.localStorage.removeItem("statistics")
			window.localStorage.removeItem("status")
			window.localStorage.removeItem("guesses")
		}
	}, []);

	useEffect(() => {
		if (status.finished) {
			const newStat = produce(statistics, (draft) => {
				const maks = Math.max(...draft.dist.map((d) => d.number));
				draft.dist = draft.dist.map((d) => ({ ...d, length: calcLength(d.number, maks) }));
			});
			dispatch(setStatistics(newStat));
			setTimeout(() => {
				dispatch(openStatistics());
			}, 1000);
		}
	}, [status]);
	useEffect(() => {
		if (status.finished) {
			window.localStorage.setItem("statistics", JSON.stringify(statistics));
			window.localStorage.setItem("status", JSON.stringify(status));
			window.localStorage.setItem("guesses", JSON.stringify(guesses));
		}
	}, [statistics]);

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
					<div style={{ width: "100%", height: "600px", position: "relative" }}>
						<Image src={url} layout="fill" alt={DICT.CONSTELLATION[lang]} objectFit="contain" />
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
						disabled={status.finished}
					/>
					<Button onClick={handleClick} variant="outlined" disabled={status.finished}>
						{DICT.SUBMIT[lang]}
					</Button>
					<div style={{ flexGrow: 1 }} />
				</Stack>
			</Paper>
		</Container>
	);
}

export default Main;
