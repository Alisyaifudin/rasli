import { CanvasComp } from "./comp-canvas";
import { setControl } from "./comp-control";
import { setNav } from "./comp-nav";
import { StarMap } from "./get-map";
import { StarData } from "./stars-data";

(function () {
	document.body.addEventListener("htmx:afterOnLoad", (e) => {
		const url = new URL(window.location.href);
		if (url.pathname.split("/").length === 3) {
			main();
		}
	});
	window.addEventListener("popstate", (e) => {
		const url = new URL(window.location.href);
		if (url.pathname.split("/").length === 3) {
			main();
		}
	});
	function main() {
		const starData = new StarData();
		const url = new URL(window.location.href);
		const pathnames = url.pathname.split("/");
		const name = decodeURIComponent(pathnames[pathnames.length - 1]);
		const zommParam = url.searchParams.get("zoom");
		let zoom = zommParam === null ? 1 : Number(zommParam);
		if (isNaN(zoom)) {
			zoom = 1;
		} else if (zoom < 1) {
			zoom = 1;
		} else if (zoom > 2) {
			zoom = 2;
		}
		const rotationParam = url.searchParams.get("rotation");
		let rotation = rotationParam === null ? 0 : Number(rotationParam);
		if (isNaN(rotation)) {
			rotation = 0;
		} else if (rotation < 0) {
			rotation = 0;
		} else if (rotation > 360) {
			rotation = 360;
		}
		const show = url.searchParams.get("show") !== null;
		starData.fetch().then((res) => {
			const selected = res.constellations.find((c) => c.name.toLowerCase() === name.toLowerCase());
			const starMap = selected === undefined ? undefined : new StarMap(starData, selected);
			const canvas = new CanvasComp(zoom, rotation, show, starMap);
			setControl(canvas);
			setNav(res.constellations, canvas, starMap);
			canvas.render();
		});
	}
	main();
})();
