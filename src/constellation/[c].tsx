import { ChevronLeft } from "~/icons/chevron-left";
import { names } from "./names";
import { StarMap } from "./starmap";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ChevronRight } from "~/icons/chevron-right";
import { Label } from "~/components/ui/label";

export function Constellation({ name }: { name: string }) {
	return (
		<main class="m-2 mx-auto min-h-[calc(100svh-69px)] flex max-w-xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<a
				hx-boost="true"
				href="/constellation"
				class="flex items-center self-start underline text-sm"
			>
				<ChevronLeft class="w-5" />
				Kembali
			</a>
			<form class="flex flex-col gap-4 w-full items-center" id="constellation-form">
				<div class="flex items-center gap-2">
					<Button type="button" variant="secondary" size="icon" disabled id="constellation-prev">
						<ChevronLeft />
					</Button>
					<Input
						value={name}
						class="max-w-[200px] w-full"
						type="text"
						list="constellation-names"
						id="constellation-input"
					/>
					<Button
						type="button"
						variant="secondary"
						size="icon"
						disabled
						id="constellation-next"
					>
						<ChevronRight />
					</Button>
				</div>
				<datalist id="constellation-names">
					{names.map((c) => (
						<option value={c[1]}></option>
					))}
				</datalist>
				<StarMap />
				<div class="flex items-center gap-2 self-start">
					<Label for="constellation-checkbox">Tampilkan Garis Rasi</Label>
					<input type="checkbox" id="constellation-checkbox" />
				</div>
				<div class="flex items-center gap-2 self-start w-full">
					<Label for="constellation-rotation">Rotasi</Label>
					<Input
						id="constellation-rotation"
						type="range"
						min={0}
						max={360}
						name="rotation"
						step="1"
						value="0"
					/>
				</div>
				<div class="flex items-center gap-2 self-start w-full">
					<Label for="constellation-zoom">Zoom</Label>
					<Input
						id="constellation-zoom"
						value="1"
						type="range"
						min={1}
						max={2}
						name="zoom"
						step="0.01"
					/>
				</div>
			</form>
			<script src="/scripts/starmap.js" type="module"></script>
		</main>
	);
}
