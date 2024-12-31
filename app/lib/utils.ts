import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import seedrandom from "seedrandom";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const integer = (key: string) =>
	z
		.string({ message: key + " harus ada" })
		.refine((value) => isFinite(Number(value)), key + " tidak sah")
		.transform<number>((value) => Number(value))
		.refine((v) => Number.isInteger(v), "Harus bulat");

export function random(seed: string): number {
	const rng = seedrandom(seed);
	return rng();
}

export function capitalizeFirst(str: string): string {
	return str
		.trim()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export function getConstellationNames(constellationCsv: string): string[] {
	const rows = constellationCsv.split("\n");
	const parsed: string[] = [];
	if (rows.length === 0) {
		return parsed;
	}
	const headers = rows[0].split(",");
	const colNum = headers.length;
	const rowNum = rows.length - 1;
	for (let i = 1; i < rowNum; i++) {
		const row = rows[i].split(",");
		if (row.length != colNum) throw new Error("row number " + i + "is incomplete: " + rows[i]);
		parsed.push(row[0].trim().toLocaleLowerCase());
	}
	return parsed;
}
