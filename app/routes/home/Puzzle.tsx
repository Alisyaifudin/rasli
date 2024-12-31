import { useEffect, useRef } from "react";
import { draw } from "./draw";
import { Line } from "~/puzzle/generate-puzzle/read-csv";

interface PuzzleProps {
	completed: boolean;
	puzzle: {
		name: string;
		stars: {
			x: number;
			y: number;
			c: string;
			s: number;
			hd: number;
		}[];
		radius: number;
		lines: Line[];
	};
}

export function Puzzle({ puzzle, completed }: PuzzleProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		if (!context) return;
		const stars = puzzle.stars;
		const radius = puzzle.radius;
		const lines = completed ? puzzle.lines : [];
		//Our draw come here
		draw(context, stars, radius, lines);
	}, [canvasRef, completed, puzzle]);

	return (
		<div className="flex aspect-square w-full xs:w-[50%] p-10">
			<canvas
				className="block w-full rounded-full"
				width="300"
				height="300"
				ref={canvasRef}
				id="canvas"
			></canvas>
		</div>
	);
}
