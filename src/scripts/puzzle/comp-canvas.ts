import { draw } from "../share/draw.js";
import type { Puzzle } from "./generate-puzzle.js";
import type { LocalData } from "./local-data.js";
import type { Mode } from "./mode.js";

export class CanvasComp {
	canvasEl: null | HTMLCanvasElement = null;
	titleEl: null | HTMLParagraphElement = null;
	constructor(private mode: Mode, private localData: LocalData, private puzzle: Puzzle) {
		const canvasEl = document.querySelector<HTMLCanvasElement>("#puzzle-canvas");
		const titleEl = document.querySelector<HTMLParagraphElement>("#mystery-title");
		if (canvasEl === null || titleEl === null) throw new Error("No canvas found");
		this.canvasEl = canvasEl;
		this.titleEl = titleEl;
	}
	get el() {
		if (this.canvasEl === null || this.titleEl === null) throw new Error("No canvas found");
		return {
			canvas: this.canvasEl,
			title: this.titleEl,
		};
	}
	render() {
		const localData = this.localData.get();
		const mode = this.mode.get();
		const completed = localData[mode].completed;
		const puzzle = this.puzzle.get();
		const context = this.el.canvas.getContext("2d");
		if (!context) return;
		const stars = puzzle.stars;
		const radius = puzzle.radius;
		const lines = completed ? puzzle.lines : [];
		draw(context, stars, radius, lines);
		if (completed) {
			this.el.title.innerText = puzzle.name;
		} else {
			this.el.title.innerText = "Misteri";
		}
		this.el.canvas.classList.remove("bg-zinc-500", "animate-pulse");
	}
}
