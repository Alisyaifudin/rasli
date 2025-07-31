export function Puzzle() {
	return (
		<>
			<p class="text-2xl font-bold" id="mystery-title">
				Misteri
			</p>
			<div class="flex aspect-square w-full sm:w-[60%] p-0">
				<canvas
					class="block w-full rounded-full bg-zinc-500 animate-pulse"
					width="300"
					height="300"
					id="puzzle-canvas"
				></canvas>
			</div>
		</>
	);
}
