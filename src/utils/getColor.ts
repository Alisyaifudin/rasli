import { coordType } from "../features/constellation/constellationInterface";

// red, orange, green
export const colors = ["#ff4f4f", "#ffbb00", "#54ff6b"];

/**
 * Calculate haversine of v (degrees)
 */
export const hav = (v: number) => Math.pow(Math.sin(((v / 2) * Math.PI) / 180), 2);

/**
 * Calculate invers haversine of v, result in degrees
 */
export const ihav = (v: number) => (2 * Math.asin(Math.sqrt(v)) * 180) / Math.PI;

/**
 * Get color in hex depending on how close the object to the target
 */
export const getColor = (object: coordType, target: coordType) => {
	const havTheta =
		hav(object.DEC - target.DEC) +
		Math.cos(object.DEC*Math.PI/180) * Math.cos(target.DEC*Math.PI/180) * hav(target.RA - object.RA);
	const theta = ihav(havTheta);
	if (theta > 120) return colors[0];
	else if (theta > 60) return colors[1];
	return colors[2];
};
