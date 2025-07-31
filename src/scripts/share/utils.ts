export function err<T>(value: T): [T, null] {
	return [value, null];
}

export function ok<T>(value: T): [null, T] {
	return [null, value];
}

export function generateRandomString(length = 16) {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const randomValues = new Uint32Array(length);
	crypto.getRandomValues(randomValues);

	let result = "";
	for (let i = 0; i < length; i++) {
		result += chars[randomValues[i] % chars.length];
	}
	return result;
}
