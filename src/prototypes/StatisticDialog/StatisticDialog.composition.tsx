import { useState } from "react";
import { StatisticDialog } from "./StatisticDialog";
import Stack from "@mui/material/Stack";

const TEXT = {
	TITLE: "Statistik",
	STATS: [
		{
			VALUE: 2,
			TEXT: "Dimainkan",
		},
		{
			VALUE: 100,
			TEXT: "% Menang",
		},
		{
			VALUE: 2,
			TEXT: "Streak Saat ini",
		},
		{
			VALUE: 2,
			TEXT: "Streak Maksimum",
		},
	],
	DIST: {
		TEXT: "Distribusi tebakan",
		DIST: [
			{
				NAME: "1",
				VALUE: 10,
				LENGTH: 10,
			},
			{
				NAME: "2",
				VALUE: 0,
				LENGTH: 1,
			},
			{
				NAME: "3",
				VALUE: 1,
				LENGTH: 2,
			},
			{
				NAME: "4",
				VALUE: 1,
				LENGTH: 2,
			},
			{
				NAME: "5",
				VALUE: 2,
				LENGTH: 3,
			},
			{
				NAME: "6",
				VALUE: 4,
				LENGTH: 5,
			},
		],
	},
	NEXT: {
		TEXT: "RASLI berikutnya",
		VALUE: "9:23:33",
	},
};

export const BasicStatisticDialog = () => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("text");
	const handleClose = () => setOpen(false);
	const handleClick = () => setOpen(true);
	const handleShare = () => setText("shared");
	return (
		<Stack>
			<StatisticDialog
				open={open}
				TEXT={TEXT}
				onClick={handleClick}
				onClose={handleClose}
				onShare={handleShare}
				finished={false}
			/>
			<p>{text}</p>
		</Stack>
	);
};

export const FinishedStatisticDialog = () => {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("text");
	const handleClose = () => setOpen(false);
	const handleClick = () => setOpen(true);
	const handleShare = () => setText("shared");
	return (
		<Stack>
			<StatisticDialog
				open={open}
				TEXT={TEXT}
				onClick={handleClick}
				onClose={handleClose}
				onShare={handleShare}
				finished
			/>
			<p>{text}</p>
		</Stack>
	);
};