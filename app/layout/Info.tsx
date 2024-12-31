import { ExternalLink, Info as Infoicon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { ScrollArea } from "~/components/ui/scroll-area";

export function Info() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<button>
					<Infoicon aria-label="info" className="mr-2 h-6 w-6" />
				</button>
			</DialogTrigger>
			<DialogContent className="bg-white dark:bg-zinc-800">
				<DialogHeader>
					<DialogTitle>CARA BERMAIN</DialogTitle>
				</DialogHeader>
				<ScrollArea className="max-h-[80vh] w-full rounded-md sm:p-4">
					<div className="text-black dark:text-white">
						<div className="flex flex-col gap-1">
							<DialogDescription className="text-base dark:text-white text-black">
								Tebak RASLI dalam 6 kesempatan. 1 hari ada 1 rasi rahasia (mode <i>comfy</i>).
							</DialogDescription>
							<DialogDescription className="text-base dark:text-white text-black">
								Setiap tebakan adalah nama rasi bintang yang valid menurut{" "}
								<a
									href="https://www.iau.org/public/themes/constellations/"
									target="_blank"
									className="underline"
								>
									<abbr>IAU</abbr>
									<ExternalLink className="w-5 h-5 inline-block pb-2" />
								</a>
								. Ketikan jawaban pada petak yang disediakan, lalu tekan JAWAB (atau tekan{" "}
								<i>Enter</i>).
							</DialogDescription>
							<DialogDescription className="text-base dark:text-white text-black">
								Setelah menjawab, tebakan akan berubah warna, bergantung seberapa dekat rasi tebakan
								dengan rasi rahasia.
							</DialogDescription>
						</div>
						<Separator className="my-4" />
						<div className="flex flex-col gap-2">
							<p className="text-lg font-bold">Contoh: Centaurus</p>
							<img
								src="/centaurus.png"
								alt="Centaurus constellation"
								className="rounded-full object-cover sm:w-[80%] sm:h-[80%] mx-auto"
							/>
							<p>Kamu mencoba menjawab:</p>
							<ul className="flex flex-col gap-3">
								<li>
									<div className="flex items-center justify-between">
										<p className="level-1 w-fit rounded-md px-2 py-1 text-red-500 dark:text-red-600 font-bold  shadow-md">
											Lacerta
										</p>
										<p>149°</p>
									</div>
									<p className="p-1">
										Warna merah menunjukkan rasi tebakan terlalu jauh. Jarak rasi lacerta dengan
										rasi centaurus adalah 149°.
									</p>
								</li>
								<li>
									<div className="flex items-center justify-between">
										<p className="level-2 w-fit rounded-md px-2 py-1 text-orange-500 dark:text-orange-600 font-bold shadow-md">
											Orion
										</p>
										<p>110°</p>
									</div>
									<p className="p-1">Warna jingga menunjukkan rasi tebakan agak jauh</p>
								</li>
								<li>
									<div className="flex items-center justify-between">
										<p className="level-3 w-fit rounded-md px-2 py-1 text-yellow-500 font-bold shadow-md">
											Crux
										</p>
										<p>12°</p>
									</div>
									<p className="p-1">Warna kuning menunjukkan rasi tebakan sudah dekat</p>
								</li>
								<li>
									<div className="flex items-center justify-between">
										<p className="level-3 w-fit rounded-md px-2 py-1 text-green-500 font-bold shadow-md">
											Centaurus
										</p>
										<p>0°</p>
									</div>
									<p className="p-1">Warna hijau berarti jawaban kamu benar 🥳</p>
								</li>
							</ul>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
