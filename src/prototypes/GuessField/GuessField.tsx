import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import _ from "lodash";

export type GuessFieldProps = {
	/**
	 * Fields of the guesses
	 */
	fields: string[];
	/**
	 * Color of the guesses
	 */
	colors: string[];
	/**
	 * Number of Available Guesses
	 */
	N?: number;
};

export function GuessField({ fields, colors, N = 6 }: GuessFieldProps) {
	const Spot = _.range(N);

	const Text = ({ i }: { i: number }) => (
		<Typography data-testid="field" component="p" variant="body1" color={colors[i]} textTransform="uppercase">
			{i < fields.length && fields[i]}&nbsp;
		</Typography>
	);
	return (
		<Stack sx={{ minWidth: 180 }}>
			{Spot.map((i) => {
				if (i !== Spot.length - 1)
					return (
						<Box key={i}>
							<Text i={i} />
							<Divider data-testid="divider"/>
						</Box>
					);
				return <Box key={i}><Text i={i} /></Box>;
			})}
		</Stack>
	);
}
