import { useState } from "react";
import { StatisticDialog } from "./StatisticDialog";

export const dummy =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const BasicStatisticDialog = () => {
	const [open, setOpen] = useState(false);
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
					VALUE: 7,
					LENGTH: 8,
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
				}
			],
		},
		NEXT: {
			TEXT: "RASLI berikutnya",
			VALUE: "9:23:33",
		},
	};
	const ImageRenderer = (src: string) => (
		<div style={{ width: "100%", height: "100%", position: "relative" }}>
			<img src={src} alt="rasi (constellation)" style={{ maxWidth: "100%" }} />
		</div>
	);
	const handleClose = () => setOpen(false);
	const handleClick = () => setOpen(true);
	return (
		<StatisticDialog
			open={open}
			TEXT={TEXT}
			ImageRenderer={ImageRenderer}
			src="/UrsaMinor.png"
			onClick={handleClick}
			onClose={handleClose}
		/>
	);
};
