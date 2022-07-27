import React from "react";
import styled from "@emotion/styled";

interface ToggleProps {
	state: boolean;
	LeftIcon: React.ReactNode;
	RightIcon: React.ReactNode;
	onClick: (state: boolean) => void;
	id: string;
}

const width = 60;
const height = width / 2;

const Input = styled("input")`
	width: 0px;
	height: ${height / 2}px;
	background-color: black;
	/* margin: 0; */
	position: relative;
	display: flex;

	:checked::before {
		position: absolute;
		content: "";
		width: ${width}px;
		height: ${height}px;
		border-radius: ${height}px;
		left: -${width / 2 + 1}px;
		top: -${height / 2 - 8}px;
	}

	::before {
		cursor: pointer;
		position: absolute;
		content: "";
		width: ${width}px;
		height: ${height}px;
		border-radius: ${height}px;
		left: -${width / 2 + 1}px;
		top: -${height / 2 - 8}px;
	}
	::after {
		cursor: pointer;
		position: absolute;
		content: "";
		width: ${height * 0.8}px;
		height: ${height * 0.8}px;
		border-radius: ${height}px;
		left: -${(width / 2) * 0.9 + 1}px;
		top: -${(height / 2) * 0.8 - 8}px;
		z-index: 1;
		transition: ease-in-out 150ms;
	}
	:checked::after {
		position: absolute;
		content: "";
		width: ${height * 0.8}px;
		height: ${height * 0.8}px;
		border-radius: ${height}px;
		left: ${(height / 16) * 0.9 + 1}px;
		top: -${(height / 2) * 0.8 - 8}px;
		z-index: 1;
	}
`;

const LeftSpan = styled("span")`
	pointer-events: none;
	left: ${width / 10}px;
`;

const RightSpan = styled("span")`
	pointer-events: none;
	right: ${width / 8}px;
`;

const Container = styled("div")`
	padding-left: ${width / 2}px;
	width: ${width}px;
`;

function Toggle({ state, LeftIcon, RightIcon, onClick, id }: ToggleProps) {
	const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		onClick(e.currentTarget.checked);
	};
	return (
		<Container className="relative flex items-center text-black dark:text-white">
			<Input
				checked={state}
				className="after:bg-white before:bg-gray-200 dark:after:bg-zinc-900 dark:before:bg-zinc-800"
				onChange={handleClick}
				type="checkbox"
				id={id}
			></Input>
			<LeftSpan className="absolute flex items-center ">{LeftIcon}</LeftSpan>
			<RightSpan className="absolute flex items-center ">{RightIcon}</RightSpan>
		</Container>
	);
}

export default Toggle;
