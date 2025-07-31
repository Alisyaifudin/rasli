import { Setting as Icon } from "~/icons/setting";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ModeTab } from "./mode-tab";
import { VERSION } from "~/lib/constants";

export function Settings() {
	return (
		<Dialog>
			<DialogTrigger size="icon" variant="ghost" class="rounded-full">
				<Icon />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>
					<h2 class="text-lg font-semibold leading-none tracking-tight pt-6">Pengaturan</h2>
				</DialogTitle>
				<div class="overflow-y-scroll no-scrollbar h-full px-4">
					<div class="flex flex-col gap-2">
						<ModeTab />
						<p class="text-base dark:text-white text-black">
							RASLI adalah game menebak rasi bintang, terinspirasi dari game wordle.
						</p>
						<p>Ini adalah RASLI versi {VERSION}</p>
					</div>
					<div class="flex justify-around p-4 text-lg">
						<p>Masukan?</p>
						<a class="underline" href="mailto:syaifudin.ali.muhammad@gmail.com">
							Email
						</a>
					</div>
					<div class="flex justify-between text-[0.7rem] text-black/70 dark:text-white/70">
						<p>
							© 2024-{new Date().getFullYear()}{" "}
							<a href="https://alisyaifudin.pages.dev/">Muhammad Ali Syaifudin</a>
						</p>
						<a class="underline" href="https://bit.ly/HadiahTerimaKasih">
							Terimakasih!
						</a>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}