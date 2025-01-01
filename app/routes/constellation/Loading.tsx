import { Link } from "@remix-run/react";
import { ChevronLeft } from "lucide-react";

export function LoadingConstellation() {
	return (
		<main className="m-2 mx-auto min-h-[calc(100svh-72px)] flex max-w-xl flex-col items-center gap-5 rounded-lg bg-zinc-50 p-3 py-4 dark:bg-zinc-900">
			<Link to="/constellation" className="flex items-center self-start underline text-sm">
				<ChevronLeft className="w-5" />
				Kembali
			</Link>
			<div className="flex flex-col gap-4 w-full items-center">
				<p className="text-sm font-medium leading-none">Nama Rasi</p>
				<div className="h-[36px] w-[288px] bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
				<div className="h-[32px] w-[140px] bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
				<div className="flex aspect-square w-full xs:w-[70%] p-0">
					<div className="block w-full rounded-full bg-zinc-500 animate-pulse h-full "></div>
				</div>
				<div className="flex items-center gap-2 self-start">
					<p className="text-sm font-medium leading-none">Tampilkan Garis Rasi</p>
					<div className="h-[14px] w-[14px] bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
				</div>
				<div className="flex items-center gap-2 self-start w-full">
					<p className="text-sm font-medium leading-none">Rotasi</p>
					<div className="h-[36px] w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
				</div>
				<div className="flex items-center gap-2 self-start w-full">
					<p className="text-sm font-medium leading-none">Zoom</p>
					<div className="h-[36px] w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
				</div>
			</div>
		</main>
	);
}
