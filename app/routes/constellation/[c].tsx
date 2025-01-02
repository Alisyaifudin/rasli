import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Form, Link, redirect, useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useData } from "~/hooks/use-data";
import { Constellation } from "~/puzzle/read-csv";
import { StarMap } from "./StarMap";
import { getPuzzle } from "./get-puzzle";
import { useDebouncedCallback } from "use-debounce";
import { integer } from "~/lib/utils";
import { Checkbox } from "~/components/ui/checkbox";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { LoadingConstellation } from "./Loading";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export function loader({ params, request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const search = url.searchParams;
	const c = search.get("c");
	if (c) {
		search.delete("c");
		const link = genLink(search, c);
		return redirect(link);
	}
	const constellationRaw = params.c;
	if (constellationRaw === undefined) throw new Response("Bad request", { status: 400 });
	return { constellationRaw };
}

export default function Page() {
	const data = useData();
	const { constellationRaw } = useLoaderData<typeof loader>();
	const isLoading = data === undefined;
	const [searchParams] = useSearchParams();
	const rotationFromSearchRaw = integer("rotation").safeParse(searchParams.get("rotation"));
	const rotation = rotationFromSearchRaw.success ? rotationFromSearchRaw.data : 0;
	const showFromSearchRaw = z.literal("on").optional().safeParse(searchParams.get("show"));
	const show = showFromSearchRaw.success ? showFromSearchRaw.data === "on" : false;
	const zoomFromSearchRaw = z.coerce
		.number()
		.min(1)
		.max(2)
		.safeParse(searchParams.get("zoom") ?? "1");
	const zoom = zoomFromSearchRaw.success ? zoomFromSearchRaw.data : 1;
	const submit = useSubmit();
	const debounce = useDebouncedCallback(
		// function
		(formEl: HTMLFormElement | null) => {
			submit(formEl);
		},
		// delay in ms
		200
	);
	const handleCheck = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const formEl = e.currentTarget.form;
		if (!formEl) return;
		const formData = new FormData(formEl);
		if (!show) formData.set("show", "on");
		else formData.delete("show");
		submit(formData);
	};
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (!inputRef.current) return;
		inputRef.current.value = constellationRaw;
	}, [constellationRaw]);

	// loading....
	if (isLoading) return <LoadingConstellation />;
	const constellations = data.constellations;
	const index = constellationRaw
		? data.constellations.findIndex(
				(c) => c.name.trim().toLowerCase() === constellationRaw.trim().toLowerCase()
		  )
		: -1;
	const selected = index > -1 ? data.constellations[index] : undefined;
	const puzzle = selected
		? getPuzzle(selected, data.stars, data.linesCsv, (rotation * Math.PI) / 180, zoom)
		: undefined;
	const next =
		index === -1 || index + 1 === data.constellations.length
			? undefined
			: genLink(searchParams, data.constellations[index + 1].name);
	const prev =
		index === -1 || index === 0
			? undefined
			: genLink(searchParams, data.constellations[index - 1].name);
	return (
		<main className="m-2 mx-auto min-h-[calc(100svh-72px)] flex max-w-xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<Link
				prefetch="intent"
				to="/constellation"
				className="flex items-center self-start underline text-sm"
			>
				<ChevronLeft className="w-5" />
				Kembali
			</Link>
			<Form className="flex flex-col gap-4 w-full items-center">
				<div className="flex items-center gap-2">
					<Button asChild variant="secondary" size="icon" disabled={prev === undefined}>
						<Link prefetch="intent" to={prev ?? "#"}>
							<ChevronLeft />
						</Link>
					</Button>
					<Input
						defaultValue={constellationRaw ?? ""}
						className="max-w-[200px] w-full"
						type="text"
						list="constellation-names"
						name="c"
						ref={inputRef}
					/>
					<Button
						variant="secondary"
						size="icon"
						type="button"
						disabled={next === undefined}
						asChild
					>
						<Link prefetch="intent" to={next ?? "#"}>
							<ChevronRight />
						</Link>
					</Button>
				</div>
				<datalist id="constellation-names">
					{constellations.map((c) => (
						<option key={c.name} value={c.name}></option>
					))}
				</datalist>
				<p className="text-2xl font-bold">{puzzle?.name ?? "Hampa"}</p>
				<StarMap zoom={zoom} puzzle={puzzle} show={show} />
				<div className="flex items-center gap-2 self-start">
					<Label htmlFor="constellation-checkbox">Tampilkan Garis Rasi</Label>
					<Checkbox
						name="show"
						defaultChecked={show}
						onClick={handleCheck}
						id="constellation-checkbox"
					/>
				</div>
				<div className="flex items-center gap-2 self-start w-full">
					<Label htmlFor="consellation-rotation">Rotasi</Label>
					<Input
						id="consellation-rotation"
						defaultValue={rotation}
						type="range"
						min={0}
						max={360}
						name="rotation"
						step={1}
						onChange={(e) => debounce(e.currentTarget.form)}
					/>
				</div>
				<div className="flex items-center gap-2 self-start w-full">
					<Label htmlFor="consellation-zoom">Zoom</Label>
					<Input
						id="consellation-zoom"
						defaultValue={zoom}
						type="range"
						min={1}
						max={2}
						name="zoom"
						step={0.01}
						onChange={(e) => debounce(e.currentTarget.form)}
					/>
				</div>
			</Form>
		</main>
	);
}

function genLink(searchParams: URLSearchParams, name: string): string {
	const url = new URL("http:localhost/constellation/" + encodeURI(name));
	url.search = searchParams.toString();
	return url.pathname + url.search;
}
