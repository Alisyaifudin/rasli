export function StarMap() {
	return (
		<div class="flex aspect-square w-full sm:w-[60%] p-0 overflow-hidden relative rounded-full">
			<canvas
				class="block bg-zinc-500 animate-pulse"
				width="600"
				height="600"
				id="starmap-canvas"
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: "200%",
					height: "200%",
					transform: "translate(-50%, -50%)",
				}}
			></canvas>
		</div>
	);
}
