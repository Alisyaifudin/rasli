import { useSearchParams } from "@remix-run/react";
import { z } from "zod";

const modeSchema = z.enum(["comfy", "unlimited"]);

export type Mode = z.infer<typeof modeSchema>;

export function useMode(): [Mode, (val: string) => void] {
	const [searchParams, setSearchParams] = useSearchParams();
	const changeMode = (val: string) => {
		const parsed = modeSchema.safeParse(val);
		const mode = !parsed.success ? "comfy" : parsed.data;
		setSearchParams((prev) => {
			prev.set("mode", mode);
			return searchParams;
		});
	};
	const parsed = modeSchema.safeParse(searchParams.get("mode") ?? "comfy");
	const mode = !parsed.success ? "comfy" : parsed.data;
	return [mode, changeMode];
}
