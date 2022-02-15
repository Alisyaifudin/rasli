import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
// Import components
import SettingDialog from "../SettingDialog/SettingDialog";

export default function SearchAppBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" data-testid="Navbar">
				<Container>
					<Toolbar data-testid="toolbar">
						<SettingDialog />
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}
