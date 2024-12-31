import { useOutletContext } from "@remix-run/react";
import { Context } from "./use-mount-local-value";

export function useMount() {
	const contextRaw = useOutletContext();
	if (typeof contextRaw !== "object" || contextRaw === null || !("mount" in contextRaw)) {
		throw new Error("useOutletContext outside the world!");
	}
	const context = contextRaw as Context;
	return context.mount;
}
