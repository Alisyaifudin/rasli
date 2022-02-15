export function rgb2hsv({ r, g, b }: { r: number; g: number; b: number }) {
	let R = r / 255;
	let G = g / 255;
	let B = b / 255;
	let v = Math.max(R, G, B),
		c = v - Math.min(R, G, B);
	let h = c && (v == R ? (G - B) / c : v == G ? 2 + (B - R) / c : 4 + (R - G) / c);
	return { h: 60 * (h < 0 ? h + 6 : h), s: v && c / v, v: v };
}
export function fromRGBFuncString2rgb(rgbFuncString: string) {
	const [R, G, B] = rgbFuncString.substring(4, rgbFuncString.length - 1).split(",");
	return { r: Number(R), g: Number(G), b: Number(B) };
}

export const componentToHex = (c: number) => {
	const hex = c.toString(16);
	return hex.length === 1 ? `0${hex}` : hex;
}

export const rgb2hex = ({ r, g, b }: { r: number; g: number; b: number }) => {
	return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}
