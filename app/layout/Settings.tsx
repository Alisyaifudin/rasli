import { Settings as SettingsIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { ModeTab } from "./ModeTab";
import { CONST } from "~/lib/constants";

export function Settings() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button>
					<SettingsIcon aria-label="settings" className="mr-2 h-6 w-6" />
				</button>
			</DialogTrigger>
			<DialogContent className="bg-white dark:bg-zinc-800">
				<DialogHeader>
					<DialogTitle>Pengaturan</DialogTitle>
				</DialogHeader>
				<div className="text-black dark:text-white">
					<div className="flex flex-col gap-2">
						<ModeTab />
						<DialogDescription className="text-base dark:text-white text-black">
							RASLI adalah game menebak rasi bintang, terinspirasi dari game wordle.
						</DialogDescription>
						<p>Ini adalah RASLI versi {CONST.VERSION}</p>
					</div>
					<div className="flex justify-around p-4 text-lg">
						<p>Masukan?</p>
						<a className="underline" href="mailto:syaifudin.ali.muhammad@gmail.com">
							Email
						</a>
					</div>
					<div className="flex justify-between text-[0.7rem] text-black/70 dark:text-white/70">
						<p>
							© 2024-{new Date().getFullYear()}{" "}
							<a href="https://alisyaifudin.pages.dev/">Muhammad Ali Syaifudin</a>
						</p>
						<a className="underline" href="https://bit.ly/HadiahTerimaKasih">
							Terimakasih!
						</a>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
