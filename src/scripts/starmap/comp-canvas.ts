import { draw } from "../share/draw.js";
import { StarMap } from "./get-map.js";

export class CanvasComp {
	canvasEl: null | HTMLCanvasElement = null;
	constructor(
		public zoom: number,
		public rotation: number,
		public showLines: boolean,
		private map?: StarMap
	) {
		const canvasEl = document.querySelector<HTMLCanvasElement>("#starmap-canvas");
		if (canvasEl === null) throw new Error("No canvas found");
		this.canvasEl = canvasEl;
	}
	get el() {
		if (this.canvasEl === null) throw new Error("No canvas found");
		return {
			canvas: this.canvasEl,
		};
	}
	render() {
		const context = this.el.canvas.getContext("2d");
		if (!context) return;
		if (this.map === undefined) {
			this.el.canvas.classList.remove("bg-zinc-500", "animate-pulse");
			this.el.canvas.classList.add("bg-black");
			return;
		}
		const map = this.map.getMap();
		const stars = map.stars;
		const radius = map.radius;
		const lines = this.showLines ? map.lines : [];
		draw(context, stars, radius, lines);
		this.el.canvas.style.width = `${(2 / this.zoom) * 100}%`;
		this.el.canvas.style.height = `${(2 / this.zoom) * 100}%`;
		this.el.canvas.style.transform = `translate(-50%, -50%) rotate(${this.rotation}deg)`;
		this.el.canvas.classList.remove("bg-zinc-500", "animate-pulse");
	}
	setZoom(v: number) {
		this.el.canvas.style.width = `${(2 / v) * 100}%`;
		this.el.canvas.style.height = `${(2 / v) * 100}%`;
		this.zoom = v;
	}
	setRotation(v: number) {
		this.el.canvas.style.transform = `translate(-50%, -50%) rotate(${v}deg)`;
		this.rotation = v;
	}
	setShow(v: boolean) {
		if (this.showLines === v) return;
		this.showLines = v;
		this.render();
	}
}
