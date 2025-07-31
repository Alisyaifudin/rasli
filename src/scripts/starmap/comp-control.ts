import { CanvasComp } from "./comp-canvas.js";

export function setControl(canvas: CanvasComp) {
	const checkEl = document.querySelector<HTMLInputElement>("#constellation-checkbox");
	const rotEl = document.querySelector<HTMLInputElement>("#constellation-rotation");
	const zoomEl = document.querySelector<HTMLInputElement>("#constellation-zoom");
	if (checkEl === null || rotEl === null || zoomEl === null) {
		throw new Error("No controls found");
	}
	checkEl.checked = canvas.showLines;
	checkEl.addEventListener("click", () => {
		const v = checkEl!.checked;
		canvas.setShow(v);
		const urlParams = new URLSearchParams(window.location.search);
		if (v) {
			urlParams.set("show", "true");
		} else {
			urlParams.delete("show");
		}
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		history.replaceState(null, "", newUrl);
	});
	rotEl.value = canvas.rotation.toString();
	rotEl.addEventListener("change", () => {
		let v = Number(rotEl!.value);
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("rotation", v.toString());
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		history.replaceState(null, "", newUrl);
		canvas.setRotation(v);
	});
	zoomEl.value = canvas.zoom.toString();
	zoomEl.addEventListener("change", () => {
		let v = Number(zoomEl!.value);
		canvas.setZoom(v);
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("zoom", v.toString());
		const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
		history.replaceState(null, "", newUrl);
	});
}
