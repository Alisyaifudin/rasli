import type { PResult } from "~/lib/utils";

function err<T>(value: T): [T, null] {
	return [value, null];
}

function ok<T>(value: T): [null, T] {
	return [null, value];
}

export type Constellation = {
	name: string;
	ra: number;
	dec: number;
	radius: number;
};

export type LineRaw = {
	star1: [number, number]; // ra, dec
	star2: [number, number];
	distance: number;
	name: string;
};

export async function fetchStars(): PResult<"No data" | "Server error", Star[]> {
	try {
		var raw = await fetch(`/stars.csv`);
	} catch (error) {
		console.error(error);
		return err("Server error");
	}
	if (raw.status >= 400) {
		console.error("Something wrong", raw.statusText);
		return err("Server error");
	}
	const data = await raw.text();
	if (!data) return err("No data");
	const stars = readStarCsv(data);
	return ok(stars);
}

export async function fetchConstellations(): PResult<"No data" | "Server error", Constellation[]> {
	try {
		var raw = await fetch(`/constellations.json`);
	} catch (error) {
		console.error(error);
		return err("Server error");
	}
	if (raw.status >= 400) {
		console.error("Something wrong", raw.statusText);
		return err("Server error");
	}
	const data = (await raw.json()) as Constellation[];
	if (!data) return err("No data");
	return ok(data);
}

export async function fetchLines(): PResult<"No data" | "Server error", LineRaw[]> {
	try {
		var raw = await fetch(`/lines.json`);
	} catch (error) {
		console.error(error);
		return err("Server error");
	}
	if (raw.status >= 400) {
		console.error("Something wrong", raw.statusText);
		return err("Server error");
	}
	const data = (await raw.json()) as LineRaw[];
	if (!data) return err("No data");
	return ok(data);
}

export function coneFilter(
	center: Position,
	radius: number,
	rotation: number,
	rawStars: (Position & { hex: string; vmag: number; hd: number })[]
) {
	const stars = rawStars.map((star) => {
		const { distance, x, y } = skyToXY(center, rotation, star);
		return {
			distance,
			x,
			y,
			c: star.hex,
			vmag: star.vmag,
			hd: star.hd,
		};
	});
	const inside = stars
		.filter((star) => star.distance < radius)
		.map((star) => ({
			x: star.x,
			y: star.y,
			c: star.c,
			s: vmagToSize(Number(star.vmag)),
			hd: Number(star.hd),
		}));
	return inside;
}

export function skyToXY(center: Position, rotation: number, star: Position) {
	const dist = distance(center, star);
	const angle = positionAngle(center, star);
	return {
		distance: dist,
		x: dist * Math.cos(angle + rotation),
		y: dist * Math.sin(angle + rotation),
	};
}

export type Position = {
	ra: number; //in degree
	dec: number; //in degree
};

/** angle in radian */
export function hav(theta: number /*in radian*/) {
	return Math.sin(theta / 2) ** 2;
}
/** angle in radian */
export function inverHav(havTheta: number) {
	// use the cosine formula
	// https://en.wikipedia.org/wiki/Haversine_formula
	const theta = 2 * Math.asin(Math.sqrt(havTheta));
	return theta;
}

/**
 * use haversine formula
 * https://en.wikipedia.org/wiki/Haversine_formula
 * @param a \{ra: degree, dec: degree\}
 * @param b \{ra: degree, dec: degree\}
 * @returns geodesic distance in degrees
 */
export function distance(a: Position, b: Position) {
	const dLat = ((a.dec - b.dec) * Math.PI) / 180;
	const dLon = ((a.ra - b.ra) * Math.PI) / 180;
	const lat1 = (a.dec * Math.PI) / 180;
	const lat2 = (b.dec * Math.PI) / 180;
	const havTheta = hav(dLat) + Math.cos(lat1) * Math.cos(lat2) * hav(dLon);
	const theta = inverHav(havTheta);
	return (theta * 180) / Math.PI;
}

export function positionAngle(center: Position, target: Position) {
	// find the angle between the north pole and the target seen from the center
	// use four part formula
	// https://en.wikipedia.org/wiki/Spherical_trigonometry
	const lat1 = (center.dec * Math.PI) / 180;
	const lat2 = (target.dec * Math.PI) / 180;
	const dLon = ((target.ra - center.ra) * Math.PI) / 180;
	const x = Math.sin(dLon);
	const y = Math.tan(lat2) * Math.cos(lat1) - Math.sin(lat1) * Math.cos(dLon);
	const theta = Math.atan2(y, x);
	return theta;
}

/**
 * all angle in radians please!
 */
export function closestDistance(sdist: number, centerToS1: number, centerToS2: number): number {
	const cosAng1 = Math.cos(centerToS1) - Math.cos(sdist) * Math.cos(centerToS2);
	const cosAng2 = Math.cos(centerToS2) - Math.cos(sdist) * Math.cos(centerToS1);
	if (cosAng1 < 0 || cosAng2 < 0) {
		return (Math.min(centerToS1, centerToS2) * 180) / Math.PI;
	}
	const ratio = Math.cos(centerToS2) / Math.cos(centerToS1);
	const tanS1 = (ratio - Math.cos(sdist)) / Math.sin(sdist);
	const s1 = Math.atan(tanS1);
	const tanRadius2 = 1 - (Math.cos(centerToS1) / Math.cos(s1)) ** 2;
	const tanRadius = Math.sqrt(tanRadius2);
	const radius = Math.atan(tanRadius);
	return (radius * 180) / Math.PI;
}

const interpolate = (xs: number[], ys: number[], x: number) => {
	// linearly interpolate between two points, given sets of x and y values
	// and a value of x to interpolate for
	const i = xs.findIndex((xval) => xval > x);
	if (i === 0) {
		return ys[0];
	}
	if (i === -1) {
		return ys[ys.length - 1];
	}
	const x0 = xs[i - 1];
	const x1 = xs[i];
	const y0 = ys[i - 1];
	const y1 = ys[i];
	return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0);
};

export const vmagToSize = (Vmag: number) => {
	const Vmags = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8];
	let sizes = [10, 5, 4, 3, 2, 1, 0.5, 0.3, 0.2, 0.1];
	sizes = sizes.map((size) => size * 0.1);
	return interpolate(Vmags, sizes, Vmag);
};

export type Star = {
	ra: number;
	dec: number;
	name: string;
	hd: number;
	vmag: number;
	bv: number;
	hex: string;
};

export function readStarCsv(text: string): Star[] {
	const rows = text.split("\n");
	const parsed: Star[] = [];
	if (rows.length === 0) {
		return parsed;
	}
	const headers = rows[0].split(",");
	const colNum = headers.length;
	const rowNum = rows.length;
	for (let i = 1; i < rowNum; i++) {
		const row = rows[i].split(",");
		if (row.length != colNum) throw new Error("row number " + i + "is incomplete: " + rows[i]);
		parsed.push({
			ra: Number(row[0]),
			dec: Number(row[1]),
			name: row[2],
			hd: Number(row[3]),
			vmag: Number(row[4]),
			bv: Number(row[5]),
			hex: row[6],
		});
	}
	return parsed;
}

export type Line = {
	edge1: {
		distance: number;
		x: number;
		y: number;
	};
	edge2: {
		distance: number;
		x: number;
		y: number;
	};
	closest: number;
	in: boolean;
};

export function generateLines(
	center: Position,
	rotation: number,
	name: string,
	linesRaw: LineRaw[]
): Line[] {
	const parsed: Line[] = [];
	for (const line of linesRaw) {
		const edge1 = skyToXY(center, rotation, { ra: line.star1[0], dec: line.star1[1] });
		const edge2 = skyToXY(center, rotation, { ra: line.star2[0], dec: line.star2[1] });
		const closest = closestDistance(
			(line.distance * Math.PI) / 180,
			(edge1.distance * Math.PI) / 180,
			(edge2.distance * Math.PI) / 180
		);
		parsed.push({ edge1, edge2, in: line.name === name, closest });
	}
	return parsed;
}
