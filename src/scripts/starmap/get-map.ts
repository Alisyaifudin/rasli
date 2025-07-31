import { coneFilter, generateLines, type Constellation, type Line } from "../share/sky.js";
import { StarData } from "./stars-data.js";

type MapData = {
	name: string;
	stars: {
		x: number;
		y: number;
		c: string;
		s: number;
		hd: number;
	}[];
	radius: number;
	lines: Line[];
};

export class StarMap {
	map: null | MapData = null;
	constructor(private starData: StarData, selected: Constellation) {
		this.setMap(selected);
	}
	setMap(selected: Constellation) {
		const { lines: linesRaw, stars } = this.starData.get();
		const center = { ra: selected.ra, dec: selected.dec };
		const inside = coneFilter(center, selected.radius * 2, 0, stars);
		const lines = generateLines(center, 0, selected.name, linesRaw);
		this.map = {
			name: selected.name,
			stars: inside,
			radius: selected.radius * 2,
			lines: lines,
		};
	}
	getMap() {
		if (this.map === null) throw new Error("no map?");
		return this.map;
	}
}
