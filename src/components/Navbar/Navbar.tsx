import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
// Import components
import SettingDialog from "../SettingDialog/SettingDialog";
import HelpDialog from "../HelpDialog/HelpDialog";
export default function SearchAppBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" data-testid="Navbar">
				<Container>
					<Toolbar data-testid="toolbar">
						<Stack direction="row" justifyContent="space-evenly" sx={{width: "100%"}}>
							<HelpDialog />
							<SettingDialog />
						</Stack>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}
