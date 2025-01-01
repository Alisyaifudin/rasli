import { useEffect, useRef } from "react";
import { Line } from "~/puzzle/read-csv";
import { draw } from "../home/draw";

export interface MapProps {
	puzzle?: {
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
	show: boolean;
	zoom: number;
}

export function StarMap({ puzzle, show, zoom }: MapProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		if (!canvasRef.current || !puzzle) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		if (!context) return;
		const stars = puzzle.stars;
		const radius = puzzle.radius * zoom;
		const lines = show ? puzzle.lines : [];
		//Our draw come here
		draw(context, stars, radius, lines);
	}, [puzzle, zoom]);
	if (!puzzle)
		return (
			<div className="flex aspect-square w-full xs:w-[70%] p-0">
				<div className="block w-full rounded-full bg-zinc-950 h-full "></div>
			</div>
		);
	return (
		<div className="flex aspect-square w-full xs:w-[70%] p-0">
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
