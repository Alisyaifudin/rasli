import { AnswerComp } from "./comp-answer.js";
import { CanvasComp } from "./comp-canvas.js";
import { StarData } from "./stars-data.js";
import { LocalData } from "./local-data.js";
import { Mode } from "./mode.js";
import { Puzzle } from "./generate-puzzle.js";
import { GuessComp } from "./comp-guess.js";
import { PuzzleEvent } from "./events.js";
import { GraphComp } from "./comp-graph.js";

(function () {
	document.body.addEventListener("htmx:afterOnLoad", (e) => {
		const url = new URL(window.location.href);
		if (url.pathname === "/") {
			main();
		}
	});
	window.addEventListener("popstate", (e) => {
		const url = new URL(window.location.href);
		if (url.pathname === "/") {
			main();
		}
	});
	function main() {
		const starData = new StarData();
		const localData = new LocalData();
		const event = new PuzzleEvent();
		const mode = new Mode(event);
		const guess = new GuessComp(mode, localData);
		const graph = new GraphComp(mode, localData);
		guess.render();
		graph.render();
		document.addEventListener("graph", () => {
			graph.render();
			graph.show();
		});
		starData.fetch().then(() => {
			const puzzle = new Puzzle(mode, starData, localData);
			const canvas = new CanvasComp(mode, localData, puzzle);
			const answer = new AnswerComp(mode, localData, starData, puzzle, event);
			canvas.render();
			answer.render();
			document.addEventListener("canvas", () => {
				canvas.render();
			});
			document.addEventListener("guess", () => {
				guess.render();
			});
			document.addEventListener("mode", () => {
				canvas.render();
				guess.render();
				answer.render();
				graph.render();
			});
		});
	}
	main();
})();
