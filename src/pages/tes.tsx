import type { NextPage } from "next";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Container, Div, Div2 } from '../styles/tes';
// Import prototypes
import { LightButton } from "../prototypes/ThemeBtn/ThemeBtn.composition";
import { InaLanguageOptions } from "../prototypes/LanguageOptions/LanguageOptions.composition";
import { BasicSettingDialog } from "../prototypes/SettingDialog/SettingDialog.composition";
import { BasicHelpDialog } from "../prototypes/HelpDialog/HelpDialog.composition";
const Test: NextPage = () => {
	return (
			<Container>
				<Div>
					<Div2>
						{/* <LightButton/> */}
						{/* <InaLanguageOptions /> */}
						{/* <BasicSettingDialog/> */}
						<BasicHelpDialog/>
					</Div2>
				</Div>
			</Container>
	);
};

export default Test;
