import React from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import BarChartIcon from "@mui/icons-material/BarChart";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LabelList,
} from "recharts";

export type StatisticDialogProps = {
	/**
	 * General Text
	 */
	TEXT: {
		TITLE: string;
		STATS: {
			VALUE: number;
			TEXT: string;
		}[];
		DIST: {
			TEXT: string;
			DIST: {
				NAME: string;
				VALUE: number;
				LENGTH: number;
			}[];
		};
		NEXT: {
			TEXT: string;
			VALUE: string;
		};
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

export function StatisticDialog({
	TEXT,
	open,
	onClick,
	onClose,
	ImageRenderer,
	src,
}: StatisticDialogProps) {
	const handleClick = () => onClick && onClick();
	const handleClose = () => onClose && onClose();
	return (
		<>
			<IconButton aria-label="stat" onClick={handleClick}>
				<BarChartIcon sx={{ color: "white" }} />
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
							sx={{ textTransform: "uppercase" }}
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
						<Stack
							direction="row"
							sx={{ gap: "10px", width: "100%" }}
							justifyContent="space-evenly"
						>
							{TEXT.STATS.map((STAT) => (
								<Stack key={STAT.TEXT} alignItems="center" flexWrap="wrap" flex="1 1 0px">
									<Typography fontSize="1.4rem">{STAT.VALUE}</Typography>
									<Typography textAlign="center" fontSize="0.9rem">
										{STAT.TEXT}
									</Typography>
								</Stack>
							))}
						</Stack>
					</ListItem>
					<ListItem>
						<Typography fontWeight={700} fontSize="1rem">
							{TEXT.DIST.TEXT.toUpperCase()}
						</Typography>
					</ListItem>
					<ListItem>
						<ResponsiveContainer width="95%" height={300}>
							<BarChart data={TEXT.DIST.DIST} layout="vertical">
								<YAxis dataKey="NAME" type="category" />
								<XAxis type="number" hide />
								<Bar dataKey="LENGTH" fill="#8884d8">
									<LabelList dataKey="VALUE" position="insideRight" fill="white" />
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</ListItem>
					<ListItem>
						<Stack direction="row" justifyContent="space-around" sx={{ width: "100%" }} alignItems="center">
							<Stack alignItems="center">
								<Typography fontSize="0.9rem">{TEXT.NEXT.TEXT.toUpperCase()}</Typography>
								<Typography fontSize="2.7rem">{TEXT.NEXT.VALUE}</Typography>
							</Stack>
							<Divider variant="middle" data-testid="divider" orientation="vertical" flexItem />
							<Button variant="contained" endIcon={<ShareIcon />} sx={{height: "fit-content"}}>
							<Typography fontSize="1.2rem">Share</Typography>
							</Button>
						</Stack>
					</ListItem>
					<Divider variant="middle" data-testid="divider" />
				</List>
			</Dialog>
		</>
	);
}
