import { type Position } from "./distance";
import { vmagToSize } from "./vmag-to-size";
import { skyToXY } from "./sky-to-xy";

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
