import { z } from "../share/zod.js";
import type { PuzzleEvent } from "./events.js";

export class Mode {
	constructor(event: PuzzleEvent) {
		const element = document.getElementById("mode-tab");
		const titleEl = document.getElementById("title-mode") as HTMLParagraphElement | null;
		if (element === null) throw new Error("no mode tab button");
		const setMode = this.set;
		const observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				if (mutation.type === "attributes" && mutation.attributeName === "data-value") {
					const raw = element.getAttribute("data-value");
					const parsed = z.enum(["comfy", "unlimited"]).safeParse(raw);
					if (!parsed.success) return;
					setMode(parsed.data);
					if (titleEl) {
						titleEl.innerText = parsed.data;
					}
					document.dispatchEvent(event.mode);
				}
			});
		});

		const config = {
			attributes: true,
			attributeFilter: ["data-value"],
		};
		observer.observe(element, config);
		const mode = this.get();
		element.setAttribute("data-value", mode);
	}
	get() {
		const url = new URL(window.location.href);
		const modeParsed = z.enum(["comfy", "unlimited"]).safeParse(url.searchParams.get("mode"));
		const mode = modeParsed.success ? modeParsed.data : "comfy";
		return mode;
	}
	set(mode: "comfy" | "unlimited") {
		const url = new URL(window.location.href);
		const search = url.searchParams;
		if (mode === "comfy") {
			search.delete("mode");
		} else {
			search.set("mode", mode);
		}
		history.replaceState(
			null,
			"",
			`${window.location.pathname}${search.toString() === "" ? "" : "?" + search.toString()}`
		);
	}
}
