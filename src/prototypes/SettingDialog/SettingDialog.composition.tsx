import { useState } from "react";
import { SettingDialog } from "./SettingDialog";

export const dummy = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

export const BasicSettingDialog = () => {
	const [open, setOpen] = useState(false);
	const ThemeBtn = () => (
		<div>
			<p>Tema</p>
		</div>
	);
	const LanguageOptions = () => (
		<div>
			<p>Bahasa</p>
		</div>
	);
	const TEXT = {
		TITLE: "Pengaturan",
		MESSAGES: [dummy],
		COPYRIGHT: "© 2022 Muhammad Ali Syaifudin",
		CONTACT: "mailto:muhammad.ali.syaifudin@hotmail.com",
		CONTACT_LABEL: "Masukan?",
		THANKS: "Terima kasih!"
	};
	const handleClose = () => setOpen(false);
	const handleClick = () => setOpen(true);
	return (
		<SettingDialog
			open={open}
			ThemeBtn={<ThemeBtn />}
			LanguageOptions={<LanguageOptions />}
			TEXT={TEXT}
			onClick={handleClick}
			onClose={handleClose}
		/>
	);
};
