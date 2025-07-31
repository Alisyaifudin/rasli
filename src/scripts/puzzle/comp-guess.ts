import type { LocalData } from "./local-data";
import type { Mode } from "./mode";

export class GuessComp {
	ulEl: HTMLUListElement | null = null;
	constructor(private mode: Mode, private localData: LocalData) {
		const ulEl = document.querySelector<HTMLUListElement>("#guess-ul");
		if (ulEl === null) throw new Error("No guess found");
		this.ulEl = ulEl;
	}
	render() {
		const ulEl = this.ulEl;
		if (ulEl === null) throw new Error("No guess found");
		ulEl.innerHTML = "";
		const localData = this.localData.get();
		const mode = this.mode.get();
		const answers = localData[mode].answers;
		let i = 0;
		for (const answer of answers) {
			const liEl = document.createElement("li");
			liEl.classList.add(
				"flex",
				"h-8",
				"items-end",
				"justify-between",
				"border-b",
				"border-b-slate-400",
				"pb-1",
				"dark:border-b-zinc-600"
			);
			const nameEl = document.createElement("p");
			nameEl.innerText = capitalizeFirst(answer.name);
			nameEl.classList.add(
				"rounded-md",
				"px-1",
				"font-bold",
				"shadow-sm",
				...nameClass(answer.distance)
			);
			liEl.appendChild(nameEl);
			const distEl = document.createElement("p");
			distEl.innerText = Math.round(answer.distance) + "°";
			liEl.appendChild(distEl);
			ulEl.appendChild(liEl);
			i++;
		}
		while (i < 6) {
			const liEl = document.createElement("li");
			liEl.classList.add(
				"flex",
				"h-8",
				"items-end",
				"justify-between",
				"border-b",
				"border-b-slate-400",
				"pb-1",
				"dark:border-b-zinc-600"
			);
			ulEl.appendChild(liEl);
			i++;
		}
		this.ulEl = ulEl;
	}
}

function nameClass(distance: number): string[] {
	if (distance < 1) return ["text-green-500"];
	if (distance < 60) return ["text-yellow-500"];
	if (distance < 120) return ["text-orange-500", "dark:text-orange-600"];
	return ["text-red-500", "dark:text-red-600"];
}

function capitalizeFirst(str: string): string {
	return str
		.trim()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
