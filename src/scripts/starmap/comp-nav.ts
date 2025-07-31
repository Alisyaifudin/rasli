import type { Constellation } from "../share/sky.js";
import type { CanvasComp } from "./comp-canvas.js";
import type { StarMap } from "./get-map.js";

export function setNav(constellations: Constellation[], canvas: CanvasComp, starmap?: StarMap) {
	const prevEl = document.querySelector<HTMLButtonElement>("#constellation-prev");
	const inputEl = document.querySelector<HTMLInputElement>("#constellation-input");
	const formEl = document.querySelector<HTMLFormElement>("#constellation-form");
	const nextEl = document.querySelector<HTMLButtonElement>("#constellation-next");
	if (prevEl === null || nextEl === null || inputEl === null || formEl === null) {
		throw new Error("No controls found");
	}
	if (starmap === undefined) return;
	const current = starmap.getMap().name;
	const index = constellations.findIndex((c) => c.name.toLowerCase() === current.toLowerCase());
	if (index >= 1) {
		prevEl.disabled = false;
	}
	if (index < constellations.length - 1) {
		nextEl.disabled = false;
	}
	inputEl.value = current;
	formEl.addEventListener("submit", (e) => {
		e.preventDefault();
		const val = inputEl.value;
		const index = constellations.findIndex(
			(c) => c.name.toLowerCase() === val.trim().toLowerCase()
		);
		if (index === -1) return;
		if (index === 0) {
			prevEl.disabled = true;
		} else {
			prevEl.disabled = false;
		}
		if (index === constellations.length - 1) {
			nextEl.disabled = true;
		} else {
			nextEl.disabled = false;
		}
		const selected = constellations[index];
		const url = new URL(window.location.href);
		const pathnames = url.pathname.split("/");
		pathnames[pathnames.length - 1] = encodeURIComponent(selected.name);
		url.pathname = pathnames.join("/");
		history.pushState(null, "", url.href);
		starmap.setMap(selected);
		canvas.render();
	});
	prevEl.addEventListener("click", () => {
		const current = starmap.getMap().name;
		const index = constellations.findIndex((c) => c.name.toLowerCase() === current.toLowerCase());
		if (index < 1) {
			return;
		}
		const selected = constellations[index - 1];
		inputEl.value = selected.name;
		const url = new URL(window.location.href);
		const pathnames = url.pathname.split("/");
		pathnames[pathnames.length - 1] = encodeURIComponent(selected.name);
		url.pathname = pathnames.join("/");
		history.pushState(null, "", url.href);
		starmap.setMap(selected);
		canvas.render();
		nextEl.disabled = false;
		if (index === 1) {
			prevEl.disabled = true;
		} else {
			prevEl.disabled = false;
		}
	});
	nextEl.addEventListener("click", () => {
		const current = starmap.getMap().name;
		const index = constellations.findIndex((c) => c.name.toLowerCase() === current.toLowerCase());
		if (index === -1) {
			return;
		}
		const selected = constellations[index + 1];
		inputEl.value = selected.name;
		const url = new URL(window.location.href);
		const pathnames = url.pathname.split("/");
		pathnames[pathnames.length - 1] = encodeURIComponent(selected.name);
		url.pathname = pathnames.join("/");
		history.pushState(null, "", url.href);
		starmap.setMap(selected);
		canvas.render();
		prevEl.disabled = false;
		if (index >= constellations.length - 2) {
			nextEl.disabled = true;
		} else {
			nextEl.disabled = false;
		}
	});
}
