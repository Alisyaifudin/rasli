import { LocalData } from "./local-data";
import { Mode } from "./mode";

export class GraphComp {
	triggerEl: null | HTMLButtonElement = null;
	titleEl: null | HTMLHeadingElement = null;
	graphEl: null | HTMLDivElement = null;
	statEl: null | {
		played: HTMLParagraphElement;
		win: HTMLParagraphElement;
		currentStreak: HTMLParagraphElement;
		maxStreak: HTMLParagraphElement;
	} = null;
	constructor(private mode: Mode, private localData: LocalData) {
		this.triggerEl = document.querySelector<HTMLButtonElement>("#graph-trigger");
		this.titleEl = document.querySelector<HTMLHeadingElement>("#graph-title");
		this.graphEl = document.querySelector<HTMLDivElement>("#graph-graph");
		const playedEl = document.querySelector<HTMLParagraphElement>("#statistics-total-played");
		const winEl = document.querySelector<HTMLParagraphElement>("#statistics-total-win");
		const currentEl = document.querySelector<HTMLParagraphElement>("#statistics-current-streak");
		const maxEl = document.querySelector<HTMLParagraphElement>("#statistics-max-streak");
		if (playedEl === null || winEl === null || currentEl === null || maxEl === null)
			throw new Error("no stats paragraph");
		this.statEl = {
			played: playedEl,
			win: winEl,
			currentStreak: currentEl,
			maxStreak: maxEl,
		};
	}
	get el() {
		if (
			this.triggerEl === null ||
			this.titleEl === null ||
			this.graphEl === null ||
			this.statEl === null
		)
			throw new Error("no graph");
		return {
			trigger: this.triggerEl,
			title: this.titleEl,
			graph: this.graphEl,
			stat: this.statEl,
		};
	}
	render() {
		const mode = this.mode.get();
		const data = this.localData.get()[mode];
		const stats = data.stats;
		const max = Math.max(...stats);
		const played = stats.reduce((p, c) => p + c);
		const win = played - stats[stats.length - 1];
		this.el.stat.played.innerText = played.toString();
		this.el.stat.win.innerText =
			(played > 0 ? Math.floor((win * 100) / played).toString() : "0") + "%";
		this.el.stat.currentStreak.innerText = data.currentStreak.toString();
		this.el.stat.maxStreak.innerText = data.maxStreak.toString();
		this.el.graph.innerHTML = "";
		this.el.title.innerText = `Statistik: ${mode.toUpperCase()}`;
		stats.forEach((value, i) => {
			const div1 = document.createElement("div");
			div1.style.width = max === 0 ? "10%" : `${10 + (value / max) * 90}%`;
			const div2 = document.createElement("div");
			div2.classList.add(
				"h-full",
				"animate-expand-width",
				"px-1",
				"text-right",
				i < 6 ? "bg-indigo-500" : "bg-red-500"
			);
			const span = document.createElement("span");
			span.classList.add("animate-fade-in", "text-white");
			span.innerText = value.toString();
			div2.appendChild(span);
			div1.appendChild(div2);
			this.el.graph.appendChild(div1);
		});
	}
	show() {
		this.el.trigger.click();
	}
}
