import { GuessField } from "./GuessField";
import Paper from "@mui/material/Paper";

export const fields = ["puppis", "leo", "draco"];
export const colors = ["#ff4f4f", "#ffbb00", "#54ff6b"];

export const BasicGuessField = () => {
	return (
		<Paper>
			<GuessField fields={fields} colors={colors} />
		</Paper>
	);
};
