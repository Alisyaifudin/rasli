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
	return radius * 180 / Math.PI;
}
