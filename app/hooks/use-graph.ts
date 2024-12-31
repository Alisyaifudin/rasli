import { useOutletContext } from "@remix-run/react";

export function useGraph(): [boolean, (state: boolean) => void] {
	const contextRaw = useOutletContext();
	if (typeof contextRaw !== "object" || contextRaw === null || !("graph" in contextRaw)) {
		throw new Error("useOutletContext outside the world!");
	}
	const context = contextRaw as {
		graph: {
			open: boolean;
			setOpen: (state: boolean) => void;
		};
	};
	return [context.graph.open, context.graph.setOpen];
}
