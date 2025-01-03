import { linesRaw } from "~/lib/lines";
import { Position, closestDistance } from "./distance";
import { skyToXY } from "./sky-to-xy";

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
	name: string
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