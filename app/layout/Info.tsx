import { Info as Infoicon } from "lucide-react";
import {
	Dialog,
	DialogContent,
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
				<ScrollArea className="max-h-[80vh] w-full rounded-md p-4">
					<div className="text-black dark:text-white">
						<div className="flex flex-col gap-1">
							<p>Tebak RASLI dalam 6 kesempatan. 1 hari ada 1 rasi rahasia.</p>
							<p>
								Setiap tebakan adalah nama rasi bintang yang valid menurut IAU. Ketikan jawaban pada
								petak yang disediakan, lalu tekan JAWAB (atau tekan <i>Enter</i>).
							</p>
							<p>
								Setelah menjawab, tebakan akan berubah warna, bergantung seberapa dekat rasi tebakan
								dengan rasi rahasia.
							</p>
						</div>
						<Separator className="my-4" />
						<div className="flex flex-col gap-2">
							<p className="text-lg font-bold">Contoh: Ursa Major</p>
							<AspectRatio ratio={16 / 9} className="bg-slate-50 dark:bg-slate-800">
								<img
									src="/UrsaMinor.webp"
									alt="by Alvaro Pinot"
									className="rounded-md object-cover w-full h-full"
								/>
							</AspectRatio>
							<p>Kamu mencoba menjawab:</p>
							<ul className="flex flex-col gap-3">
								<li>
									<p className="level-1 w-fit rounded-md px-2 py-1 bg-red-500 dark:bg-red-600 font-bold text-white shadow-md">
										PUPPIS
									</p>
									<p className="p-1">Warna merah menunjukkan rasi tebakan terlalu jauh</p>
								</li>
								<li>
									<p className="level-2 w-fit rounded-md px-2 py-1 bg-orange-500 dark:bg-orange-600 font-bold text-white shadow-md">
										LEO
									</p>
									<p className="p-1">Warna jingga menunjukkan rasi tebakan agak jauh</p>
								</li>
								<li>
									<p className="level-3 w-fit rounded-md px-2 py-1 bg-yellow-500 font-bold text-white shadow-md">
										DRACO
									</p>
									<p className="p-1">Warna kuning menunjukkan rasi tebakan sudah dekat</p>
								</li>
							</ul>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
