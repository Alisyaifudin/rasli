import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
// Import components
import SettingDialog from "../SettingDialog/SettingDialog";
import HelpDialog from "../HelpDialog/HelpDialog";
import Typography from "@mui/material/Typography";
import { VERSION } from "../../utils/DICT";

export default function SearchAppBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" data-testid="Navbar">
				<Container>
					<Toolbar data-testid="toolbar">
						<Stack direction="row" justifyContent="space-evenly" sx={{ width: "100%" }}>
							<HelpDialog />
							<Stack direction="row">
								<Typography component="h1" variant="h4" fontWeight={700} alignSelf="flex-end">
									RASLI
								</Typography>
								<Typography component="h2" variant="caption" alignSelf="flex-end">
									v{VERSION}
								</Typography>
							</Stack>
							<SettingDialog />
						</Stack>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}
