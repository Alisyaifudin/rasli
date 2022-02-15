import type { NextPage } from "next";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Container, Div, Div2 } from '../styles/tes';
// Import prototypes
import { LightButton } from "../prototypes/ThemeBtn/ThemeBtn.composition";

const Test: NextPage = () => {
	return (
			<Container>
				<Div>
					<Div2>
						<LightButton/>
					</Div2>
				</Div>
			</Container>
	);
};

export default Test;
