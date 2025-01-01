import { Position, closestDistance } from "./distance";
import { skyToXY } from "./sky-to-xy";

export type Constellation = {
	name: string;
	ra: number;
	dec: number;
	radius: number;
};

export function readConstellationCsv(text: string): Constellation[] {
	const rows = text.split("\n");
	const parsed: Constellation[] = [];
	if (rows.length === 0) {
		return parsed;
	}
	const headers = rows[0].split(",");
	const colNum = headers.length;
	const rowNum = rows.length - 1;
	for (let i = 1; i < rowNum; i++) {
		const row = rows[i].split(",");
		if (row.length != colNum) throw new Error("row number " + i + "is incomplete: " + rows[i]);
		parsed.push({
			name: row[0],
			ra: Number(row[1]),
			dec: Number(row[2]),
			radius: Number(row[3]),
		});
	}
	return parsed;
}

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
	const rowNum = rows.length - 1;
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
	distance: number;
	in: boolean;
};

export function readLineCsv(
	text: string,
	center: Position,
	rotation: number,
	name: string
): Line[] {
	const rows = text.split("\n");
	const parsed: Line[] = [];
	if (rows.length === 0) {
		return parsed;
	}
	const headers = rows[0].split(",");
	const colNum = headers.length;
	const rowNum = rows.length - 1;
	for (let i = 1; i < rowNum; i++) {
		const row = rows[i].split(",");
		if (row.length != colNum) throw new Error("row number " + i + "is incomplete: " + rows[i]);
		const ra1 = Number(row[0]);
		const dec1 = Number(row[1]);
		const ra2 = Number(row[2]);
		const dec2 = Number(row[3]);
		const edge1 = skyToXY(center, rotation, { ra: ra1, dec: dec1 });
		const edge2 = skyToXY(center, rotation, { ra: ra2, dec: dec2 });
		const sdist = Number(row[5]);
		const closest = closestDistance(
			(sdist * Math.PI) / 180,
			(edge1.distance * Math.PI) / 180,
			(edge2.distance * Math.PI) / 180
		);
		parsed.push({ edge1, edge2, in: row[4] === name, distance: closest });
	}
	return parsed;
}
