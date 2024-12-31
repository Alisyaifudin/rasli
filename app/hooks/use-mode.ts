import { useSearchParams } from "@remix-run/react";
import { z } from "zod";

export function useMode(): ["comfy" | "unlimited", (val: string) => void] {
	const [searchParams, setSearchParams] = useSearchParams();
	const changeMode = (val: string) => {
		const parsed = z.enum(["comfy", "unlimited"]).safeParse(val);
		const mode = !parsed.success ? "comfy" : parsed.data;
		setSearchParams((prev) => {
			prev.set("mode", mode);
			return searchParams;
		});
	};
	const parsed = z.enum(["comfy", "unlimited"]).safeParse(searchParams.get("mode") ?? "comfy");
	const mode = !parsed.success ? "comfy" : parsed.data;
	return [mode, changeMode];
}
