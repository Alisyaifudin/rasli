import { fetchConstellations, fetchLines, fetchStars } from "../share/sky.js";
import type { Constellation, LineRaw, Star } from "../share/sky.js";

export class StarData {
	stars: null | Star[] = null;
	constellations: null | Constellation[] = null;
	lines: null | LineRaw[] = null;

	fetch() {
		return Promise.all([fetchStars(), fetchConstellations(), fetchLines()]).then((res) => {
			const [[errStars, starsD], [errConstellations, constellationsD], [errLines, linesD]] = res;
			if (errStars) throw new Error(errStars);
			if (errConstellations) throw new Error(errConstellations);
			if (errLines) throw new Error(errLines);
			this.stars = starsD;
			this.constellations = constellationsD;
			this.lines = linesD;
		});
	}

	get() {
		if (this.stars === null || this.constellations === null || this.lines === null)
			throw new Error("No stars data");
		return { stars: this.stars, constellations: this.constellations, lines: this.lines };
	}
}
