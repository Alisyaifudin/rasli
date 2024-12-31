import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useQuery } from "react-query";
import { z } from "zod";

export async function loader({ params }: LoaderFunctionArgs) {
	const parsed = z.enum(["comfy", "unlimited"]).safeParse(params.mode);
	const mode = !parsed.success ? "comfy" : parsed.data;
	return { mystery: mode };
}

export function useMystery(mode: "comfy" | "unlimited") {
	const { data } = useQuery(mode, async () => {
		const fetching = await fetch("/get-mystery/" + mode);
		const jsonObj = (await fetching.json()) as Awaited<ReturnType<typeof loader>>;
		return jsonObj.mystery;
	});

	return data;
}
