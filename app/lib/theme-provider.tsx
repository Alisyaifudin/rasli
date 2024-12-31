// server side
export function getThemeFromCookieHeader(cookieHeader: string | null): "light" | "dark" {
	if (!cookieHeader) return "light";

	const themeCookie = cookieHeader.split(";").find((cookie) => cookie.trim().startsWith("theme="));

	if (!themeCookie) return "light";

	const themeValue = themeCookie.split("=")[1].trim();

	// Validate theme value
	if (themeValue === "light" || themeValue === "dark") {
		return themeValue;
	}

	return "light";
}

// client side
export function getTheme(): "light" | "dark" {
	// Get theme from cookie
	const theme = document.cookie
		.split("; ")
		.find((row) => row.startsWith(`$theme=`))
		?.split("=")[1];

	// Validate theme value
	if (theme === "light" || theme === "dark") {
		return theme;
	}

	return "light";
}

export function setTheme(theme: "light" | "dark" | "system"): void {
	// Set cookie to expire in 1 year
	let t = theme;
	if (t === "system") {
		t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}
	document.cookie = `theme=${t};path=/;max-age=${60 * 60 * 24 * 365}`;
	applyTheme(theme);
}

function applyTheme(theme: "dark" | "light" | "system"): void {
	const root = window.document.documentElement;
	root.classList.remove("light", "dark");

	if (theme === "system") {
		const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
		root.classList.add(systemTheme);
	} else {
		root.classList.add(theme);
	}
}
