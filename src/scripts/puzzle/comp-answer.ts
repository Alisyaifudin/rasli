import { distance } from "../share/sky.js";
import { generateRandomString } from "../share/utils.js";
import type { PuzzleEvent } from "./events.js";
import type { Puzzle } from "./generate-puzzle.js";
import type { LocalData } from "./local-data.js";
import type { Mode } from "./mode.js";
import type { StarData } from "./stars-data.js";

export class AnswerComp {
	private errorEl: null | HTMLParagraphElement = null;
	private buttonEl: null | HTMLButtonElement = null;
	private inputEl: null | HTMLInputElement = null;
	private formEl: null | HTMLFormElement = null;
	private auxEl: null | HTMLButtonElement = null;
	constructor(
		private mode: Mode,
		private localData: LocalData,
		private starData: StarData,
		private puzzle: Puzzle,
		private event: PuzzleEvent
	) {
		const errorEl = document.querySelector<HTMLParagraphElement>("#answer-error");
		const buttonEl = document.querySelector<HTMLButtonElement>("#answer-button");
		const inputEl = document.querySelector<HTMLInputElement>("#answer-input");
		const formEl = document.querySelector<HTMLFormElement>("#answer-form");
		const auxEl = document.querySelector<HTMLButtonElement>("#answer-aux");
		if (
			errorEl === null ||
			buttonEl === null ||
			inputEl === null ||
			auxEl === null ||
			formEl === null
		)
			throw new Error("No answer found");
		this.errorEl = errorEl;
		this.buttonEl = buttonEl;
		this.inputEl = inputEl;
		this.formEl = formEl;
		this.auxEl = auxEl;
		this.submit();
		this.clickNext();
	}
	submit() {
		this.el.form.addEventListener("submit", (e: SubmitEvent) => {
			e.preventDefault();
			const puzzle = this.puzzle.get();
			const localData = this.localData.get();
			const mode = this.mode.get();
			const answers = localData[mode].answers;
			const completed = localData[mode].completed;
			if (completed) return;
			if (answers.length >= 6) return;
			const { constellations } = this.starData.get();
			const answer = this.el.input.value.trim().toLowerCase();
			const guess = constellations.find((c) => c.name.trim().toLowerCase() === answer);
			if (!guess) {
				this.el.error.innerText = "Rasi tidak valid";
				this.el.error.classList.remove("hidden");
				return;
			}
			if (answers.find((a) => a.name === answer)) {
				this.el.error.innerText = "Sudah dicoba";
				this.el.error.classList.remove("hidden");
				return;
			}
			this.el.error.innerText = "";
			this.el.input.value = "";
			if (!this.el.error.classList.contains("hidden")) {
				this.el.error.classList.add("hidden");
			}

			const target = constellations.find(
				(c) => c.name.trim().toLowerCase() === puzzle.name.trim().toLowerCase()
			);
			if (target === undefined) return;
			const dist = distance({ ra: guess.ra, dec: guess.dec }, { ra: target.ra, dec: target.dec });
			localData[mode].answers.push({ name: answer, distance: dist });
			const newAnswers = localData[mode].answers;
			document.dispatchEvent(this.event.guess);
			if (guess.name === target.name) {
				localData[mode].completed = true;
				localData[mode].currentStreak++;
				if (localData[mode].currentStreak > localData[mode].maxStreak) {
					localData[mode].maxStreak = localData[mode].currentStreak;
				}
				this.el.input.disabled = true;
				this.el.button.disabled = true;
				this.el.aux.innerText = "Selanjutnya";
				localData[mode].stats[newAnswers.length - 1]++;
				this.localData.set(mode, localData);
				document.dispatchEvent(this.event.canvas);
				document.dispatchEvent(this.event.graph);
			} else if (newAnswers.length >= 6) {
				localData[mode].completed = true;
				localData[mode].completedAt = Date.now();
				localData[mode].currentStreak = 0;
				localData[mode].stats[6]++;
				this.el.input.disabled = true;
				this.el.button.disabled = true;
				this.localData.set(mode, localData);
				this.el.aux.innerText = "Selanjutnya";
				document.dispatchEvent(this.event.canvas);
				document.dispatchEvent(this.event.graph);
			} else {
				this.localData.set(mode, localData);
			}
		});
	}
	clickNext() {
		const { constellations, stars, lines } = this.starData.get();
		this.el.aux.addEventListener("click", () => {
			const data = this.localData.get();
			data.unlimited.seed = generateRandomString();
			if (!data.unlimited.completed) {
				data.unlimited.currentStreak = 0;
			}
			data.unlimited.completed = false;
			data.unlimited.answers = [];
			const newPuzzle = this.puzzle.generate(stars, data.unlimited.seed, constellations, lines);
			this.puzzle.set(newPuzzle, "unlimited");
			this.localData.set("unlimited", data);
			document.dispatchEvent(this.event.canvas);
			document.dispatchEvent(this.event.guess);
			this.el.input.innerText = "";
			this.el.button.disabled = false;
			this.el.input.disabled = false;
			this.el.aux.innerText = "Lewati";
			this.el.input.focus();
		});
	}
	get el() {
		if (
			this.errorEl === null ||
			this.buttonEl === null ||
			this.inputEl === null ||
			this.auxEl === null ||
			this.formEl === null
		)
			throw new Error("No answer found");
		return {
			error: this.errorEl,
			button: this.buttonEl,
			input: this.inputEl,
			aux: this.auxEl,
			form: this.formEl,
		};
	}
	render() {
		const localData = this.localData.get();
		const mode = this.mode.get();
		const completed = localData[mode].completed;
		if (mode === "unlimited") {
			this.el.aux.hidden = false;
		} else {
			this.el.aux.hidden = true;
		}
		if (completed) {
			this.el.aux.innerText = "Selanjutnya";
			this.el.input.disabled = true;
			this.el.button.disabled = true;
		} else {
			this.el.aux.innerText = "Lewati";
			this.el.input.disabled = false;
			this.el.button.disabled = false;
		}
	}
}
