import { z } from "./share/zod.js";

interface CookieOptions {
	days?: number;
	path?: string;
	domain?: string;
	secure?: boolean;
	sameSite?: "Strict" | "Lax" | "None";
}

function setCookie(name: string, value: string, options: CookieOptions = {}): void {
	let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

	if (options.days) {
		const date = new Date();
		date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
		cookie += `; expires=${date.toUTCString()}`;
	}

	cookie += `; path=${options.path || "/"}`;

	if (options.domain) {
		cookie += `; domain=${options.domain}`;
	}

	if (options.secure) {
		cookie += "; secure";
	}

	if (options.sameSite) {
		cookie += `; samesite=${options.sameSite}`;
		if (options.sameSite.toLowerCase() === "none") {
			cookie += "; secure";
		}
	}

	document.cookie = cookie;
}
function getCookie(name: string): string | null {
	const cookies = document.cookie.split(";");

	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.trim().split("=");
		if (decodeURIComponent(cookieName) === name) {
			return decodeURIComponent(cookieValue);
		}
	}

	return null;
}

type Theme = "system" | "dark" | "light";

(function () {
	document.body.addEventListener("htmx:afterOnLoad", (e) => {
		main();
	});
	window.addEventListener("popstate", (e) => {
		main();
	});
	function main() {
		const THEME_KEY = "__theme";

		const themeParsed = z
			.enum(["system", "light", "dark"])
			.safeParse(getCookie(THEME_KEY) ?? "system");
		let theme = themeParsed.success ? themeParsed.data : "system";

		if (
			theme === "system" &&
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			addDark();
		}

		function addDark() {
			document.documentElement.classList.add("dark");
			setCookie(THEME_KEY, "dark");
			theme = "dark";
		}

		function removeDark() {
			document.documentElement.classList.remove("dark");
			setCookie(THEME_KEY, "light");
			theme = "light";
		}

		function setDocumentTheme(theme: Theme) {
			switch (theme) {
				case "system":
					if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
						addDark();
					} else {
						removeDark();
					}
					break;
				case "dark":
					addDark();
					break;
				case "light":
					removeDark();
					break;
			}
		}

		const handleClick = () => {
			switch (theme) {
				case "system":
					if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
						setDocumentTheme("light");
					} else {
						setDocumentTheme("dark");
					}
					break;
				case "dark":
					setDocumentTheme("light");
					break;
				case "light":
					setDocumentTheme("dark");
					break;
			}
		};

		const el = document.getElementById("theme-btn") as HTMLButtonElement | null;

		if (el === null) throw new Error("No theme button");

		el.addEventListener("click", handleClick);
	}
	main();
})();
