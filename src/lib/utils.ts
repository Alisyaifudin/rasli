import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";
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

export function capitalizeFirst(str: string): string {
	return str
		.trim()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export type Result<E, T> = [E, null] | [null, T];

export type PResult<E, T> = Promise<Result<E, T>>;

export function err<T>(value: T): [T, null] {
	return [value, null];
}

export function ok<T>(value: T): [null, T] {
	return [null, value];
}
