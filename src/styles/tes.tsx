import { styled } from "@mui/material/styles";

export const Div = styled("div")`
	border: 1px solid;
	width: 300px;
	height: 300px;
	overflow: auto;
	resize: both;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: ${({ theme }) =>
		theme.palette.mode === "dark"
			? "repeating-linear-gradient(rgba(255,255,255,0.1) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0 1px, transparent 1px 100%)"
			: "repeating-linear-gradient(rgba(0,0,0,0.1) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0 1px, transparent 1px 100%)"};
	background-size: ${({ theme }) => theme.spacing(1, 1)};
`;

export const Div2 = styled("div")`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: ${({ theme }) =>
		theme.palette.mode === "dark"
			? "repeating-linear-gradient(rgba(255,255,255,0.1) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0 1px, transparent 1px 100%)"
			: "repeating-linear-gradient(rgba(0,0,0,0.1) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0 1px, transparent 1px 100%)"};
	background-size: ${({ theme }) => theme.spacing(5, 5)};
	padding: ${({ theme }) => theme.spacing(2, 2)};
`;

export const Container = styled("div")`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
`;