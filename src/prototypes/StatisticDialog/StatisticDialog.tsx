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
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";

export type StatisticDialogProps = {
	/**
	 * General Text
	 */
	TEXT: {
		TITLE: string;
		HOWTO: string[];
		EXAMPLE: string;
		EX: {
			GUESS: string;
			HINT: string;
			COLOR: string;
		}[];
	};
	/**
	 * Open the dialog
	 */
	open: boolean;
	/**
	 * open dialog by clicking the ? button
	 */
	onClick: () => void;
	/**
	 * close dialog by clicking backdrop or X
	 */
	onClose: () => void;
	/**
	 * image renderer
	 */
	ImageRenderer: (src: string) => React.ReactNode;
	/**
	 * Image source
	 */
	src: string;
};

export function StatisticDialog({ TEXT, open, onClick, onClose, ImageRenderer, src }: StatisticDialogProps) {
	const handleClick = () => onClick && onClick();
	const handleClose = () => onClose && onClose();

	return (
		<>
			<IconButton aria-label="help" onClick={handleClick}>
				<HelpIcon sx={{ color: "white" }} />
			</IconButton>
			<Dialog maxWidth="xs" scroll="paper" onClose={handleClose} open={open}>
				<DialogTitle>
					<Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
						<Typography
							alignSelf="flex-end"
							fontWeight={700}
							fontSize="1rem"
							component="h2"
							variant="h6"
							align="center"
							sx={{textTransform: "uppercase"}}
						>
							{TEXT.TITLE}
						</Typography>
						<IconButton onClick={handleClose}>
							<CloseIcon color="error" />
						</IconButton>
					</Stack>
				</DialogTitle>
				<List sx={{ pt: 0 }}>
					<ListItem>
						<Stack sx={{ gap: "5px" }}>
							{TEXT.HOWTO.map((HOW, i) => (
								<Typography key={i} fontSize="0.9rem">{HOW}</Typography>
							))}
						</Stack>
					</ListItem>
					<Divider variant="middle" data-testid="divider"/>
					<ListItem>
						<Typography fontSize="0.95rem" component="h5" variant="h6" fontWeight={700}>
							{TEXT.EXAMPLE}
						</Typography>
					</ListItem>
					<ListItem>{ImageRenderer(src)}</ListItem>
					{TEXT.EX.map((E) => (
						<ListItem key={E.GUESS}>
							<Stack>
								<Paper sx={{width: "fit-content", padding: "0 6px"}}>
									<Typography fontSize="0.9rem" component="h6" variant="h6" sx={{ color: E.COLOR }}>
										{E.GUESS}
									</Typography>
								</Paper>
								<Typography fontSize="0.9rem" component="p" variant="subtitle1">
									{E.HINT}
								</Typography>
							</Stack>
						</ListItem>
					))}
					<Divider variant="middle" data-testid="divider"/>
				</List>
			</Dialog>
		</>
	);
}
