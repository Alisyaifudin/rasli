import { hav, inverHav } from "~/puzzle/distance";
import { Line } from "~/puzzle/read-csv";

type Options = {
	x: number;
	y: number;
	radius: number;
	startAngle: number;
	endAngle: number;
	counterclockwise?: boolean;
	color: string | CanvasGradient | CanvasPattern;
};

function circle(ctx: CanvasRenderingContext2D, options: Options, alpha = 1) {
	const { x, y, radius, startAngle, endAngle, color } = options;
	ctx.fillStyle = color;
	ctx.globalAlpha = alpha;
	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle, endAngle);
	ctx.fill();
}

function background(ctx: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern) {
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawLine(ctx: CanvasRenderingContext2D, line: Line, r: number, c?: string) {
	const xStart = ((1 + line.edge1.x / r) * ctx.canvas.width) / 2;
	const yStart = ((1 + line.edge1.y / r) * ctx.canvas.height) / 2;
	const xFinish = ((1 + line.edge2.x / r) * ctx.canvas.width) / 2;
	const yFinish = ((1 + line.edge2.y / r) * ctx.canvas.height) / 2;
	ctx.strokeStyle = line.in ? "#fff" : c ? c : "#f00";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(xStart, yStart);
	ctx.lineTo(xFinish, yFinish);
	ctx.stroke();
}

export type Star = {
	x: number;
	y: number;
	s: number;
	c: string;
	hd: number;
};

export function draw(ctx: CanvasRenderingContext2D, stars: Star[], r: number, lines: Line[]) {
	background(ctx, "#000");
	if (!stars) return;
	if (lines.length) {
		for (const line of lines) {
			if (line && line.closest < r) {
				drawLine(ctx, line, r);
			}
		}
	}
	for (const star of stars) {
		const options: Options = {
			x: ((1 + star.x / r) * ctx.canvas.width) / 2,
			y: ((1 + star.y / r) * ctx.canvas.height) / 2,
			radius: ((star.s / r) * ctx.canvas.height) / 2,
			startAngle: 0,
			endAngle: 2 * Math.PI,
			counterclockwise: false,
			color: "#000",
		};
		// dark outer circle
		if (lines.length) {
			const dr = Math.min(options.radius, 3);
			options.radius += dr;
			circle(ctx, options);
			ctx.globalAlpha = 1;
			options.radius -= dr;
		}
		// the star
		options.color = star.c;
		circle(ctx, options);
		ctx.globalAlpha = 1;
		// the blur
		options.color = "#fff";
		options.radius = options.radius * 0.6;
		circle(ctx, options, 0.4);
		ctx.globalAlpha = 1;
	}
}
