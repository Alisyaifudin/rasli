import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
// Import components
import ThemeBtn from "../ThemeBtn/ThemeBtn";
import LanguageOptions from "../LanguageOptions/LanguageOptions";

export default function SearchAppBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" data-testid="Navbar">
				<Container>
					<Toolbar data-testid="toolbar">
						<ThemeBtn />
						<LanguageOptions />
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}
