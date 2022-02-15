import { useState } from "react";
import { HelpDialog } from "./HelpDialog";

export const dummy =
	"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const BasicHelpDialog = () => {
	const [open, setOpen] = useState(false);
	const TEXT = {
		TITLE: "CARA BERMAIN",
		HOWTO: [
			"Tebak RASLI dalam 6 kesempatan. 1 hari ada 1 rasi rahasia.",
			"Setiap tebakan adalah nama rasi bintang yang valid menurut IAU. Ketikan jawaban pada petak yang disediakan, lalu tekan JAWAB.",
			"Setelah menjawab, tebakan akan berubah warna, bergantung seberapa dekat rasi tebakan dengan rasi rahasia.",
		],
		EXAMPLE: "Contoh",
		EX: [
			{
				GUESS: "PUPPIS",
				HINT: "Warna merah menunjukkan rasi tebakan terlalu jauh",
				COLOR: "#ff4f4f",
			},
			{
				GUESS: "LEO",
				HINT: "Warna jingga menunjukkan rasi tebakan agak jauh",
				COLOR: "#ffbb00",
			},
			{
				GUESS: "DRACO",
				HINT: "Warna hijau menunjukkan rasi tebakan sudah dekat",
				COLOR: "#54ff6b",
			},
		],
	};
	const ImageRenderer = (src: string) => (
		<div style={{ width: "100%", height: "100%", position: "relative" }}>
			<img src={src} alt="rasi (constellation)" style={{ maxWidth: "100%" }} />
		</div>
	);
	const handleClose = () => setOpen(false);
	const handleClick = () => setOpen(true);
	return (
		<HelpDialog
			open={open}
			TEXT={TEXT}
			ImageRenderer={ImageRenderer}
			src="/UrsaMinor.png"
			onClick={handleClick}
			onClose={handleClose}
		/>
	);
};
