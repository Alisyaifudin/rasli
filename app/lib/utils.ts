import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";
import seedrandom from 'seedrandom';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
