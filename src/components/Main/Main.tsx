import React, { useMemo } from "react";
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
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import {max} from "@cloudinary/url-gen/actions/roundCorners";

// Import any actions required for transformations.
import { crop, fill } from "@cloudinary/url-gen/actions/resize";
import {byAngle} from "@cloudinary/url-gen/actions/rotate"
import { URLSearchParams } from "url";
import { random } from '../../utils/random'
import { auto } from "@cloudinary/url-gen/qualifiers/quality";

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
	const url = useMemo(() => {
		const myImage = cld.image(secret.src);
		const angle = random(new Date().toUTCString())*360;
		// const angle = 0.01
		let alpha = angle
		if(alpha>270) alpha -= 270;
		else if(alpha>180) alpha -=180;
		else if(alpha>90) alpha -= 90;
		const ratio = 1/(Math.sin(Math.PI/180*alpha)+Math.cos(Math.PI/180*alpha))
		myImage
		.resize(fill(700))
		.rotate(byAngle(angle))
		.resize(crop(ratio))
		.roundCorners(max())
		return myImage.toURL()
	}, [secret])
	
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
					<div style={{ width: "100%", height: "600px", position: "relative"}}>
						{/* <AdvancedImage cldImg={myImage} /> */}
						<Image
							src={url}
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
