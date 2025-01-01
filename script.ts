import fs from "node:fs/promises";

export type Position = {
	ra: number; //in degree
	dec: number; //in degree
};

function hav(theta: number /*in radian*/) {
	return Math.sin(theta / 2) ** 2;
}
function inverHav(x: number) {
	// use the cosine formula
	// https://en.wikipedia.org/wiki/Haversine_formula
	const cosTheta = 1 - 2 * x;
	return Math.acos(cosTheta);
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

async function main() {
	const text = await fs.readFile("./public/lines.csv", { encoding: "utf-8" });
	const rows = text.split("\n");
	const total = rows.length;
	let newText =
		rows[0]
			.split(",")
			.map((r) => r.trim())
			.join(",") + ",distance";
	for (let i = 1; i < total; i++) {
		const row = rows[i].split(",");
		const ra1 = Number(row[0]);
		const dec1 = Number(row[1]);
		const ra2 = Number(row[2]);
		const dec2 = Number(row[3]);
		const name = row[4].trim();
		const dist = distance({ ra: ra1, dec: dec1 }, { ra: ra2, dec: dec2 });
		newText += `\n${ra1},${dec1},${ra2},${dec2},${name},${dist}`;
	}
	await fs.writeFile("lines2.csv", newText);
}

main().then(() => console.log("completed"));
