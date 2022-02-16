import React from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

export type SettingDialogProps = {
	/**
	 * General Text
	 */
	TEXT: {
		TITLE: string;
		MESSAGE: string;
		COPYRIGHT: string;
		CONTACT: string;
		CONTACT_LABEL: string;
		THANKS: string;
	};
	/**
	 * ThemeBtn component
	 */
	ThemeBtn: React.ReactElement;
	/**
	 * LanguageOptions component
	 */
	LanguageOptions: React.ReactElement;
	open: boolean;
	onClick: () => void;
	onClose: () => void;
};

export function SettingDialog({
	TEXT,
	ThemeBtn,
	LanguageOptions,
	open,
	onClick,
	onClose,
}: SettingDialogProps) {
	const handleClick = () => onClick && onClick();
	const handleClose = () => onClose && onClose();

	return (
		<>
			<IconButton aria-label="setting" onClick={handleClick}>
				<SettingsIcon sx={{color: "white"}}/>
			</IconButton>
			<Dialog maxWidth="xs" scroll="paper" onClose={handleClose} open={open}>
				<DialogTitle>
					<Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
						<Typography component="h2" variant="h5">
							{TEXT.TITLE}
						</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon color="error" />
						</IconButton>
					</Stack>
				</DialogTitle>
				<List sx={{ pt: 0 }}>
					<ListItem>
						<Stack flexWrap="wrap-reverse" direction="row" alignItems="center" justifyContent="space-around" sx={{ width: "100%", gap: "20px" }}>
							{LanguageOptions}
							{ThemeBtn}
						</Stack>
					</ListItem>
					<ListItem>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">{TEXT.MESSAGE}</DialogContentText>
						</DialogContent>
					</ListItem>
					<ListItem>
						<Stack direction="row" justifyContent="space-evenly" sx={{ width: "100%" }}>
							<Typography component="p">{TEXT.CONTACT_LABEL}</Typography>
							<Typography component="a" href={TEXT.CONTACT} sx={{ textDecoration: "underline" }}>
								Email
							</Typography>
						</Stack>
					</ListItem>
					<ListItem>
						<Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
							<Typography component="p" variant="caption" fontSize={11}>
								{TEXT.COPYRIGHT}
							</Typography>
							<Typography
								component="a"
								variant="caption"
								fontSize={11}
								href="https://bit.ly/HadiahTerimaKasih"
								sx={{ textDecoration: "underline" }}
								target="_blank"
							>
								{TEXT.THANKS}
							</Typography>
						</Stack>
					</ListItem>
				</List>
			</Dialog>
		</>
	);
}
