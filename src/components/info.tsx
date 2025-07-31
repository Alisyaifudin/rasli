import { Info as Icon } from "~/icons/info";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { External } from "~/icons/external";

export function Info() {
	return (
		<Dialog>
			<DialogTrigger size="icon" variant="ghost" class="rounded-full">
				<Icon />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>
					<h2 class="text-lg font-semibold leading-none tracking-tight pt-6">CARA BERMAIN</h2>
				</DialogTitle>
				<div class="overflow-y-scroll no-scrollbar h-full py-2 px-1 sm:px-8">
					<div class="flex flex-col gap-2 sm:px-4">
						<p>
							Tebak RASLI dalam 6 kesempatan. 1 hari ada 1 rasi rahasia (mode <i>comfy</i>).
						</p>
						<p>
							Setiap tebakan adalah nama rasi bintang yang valid menurut{" "}
							<a
								href="https://www.iau.org/public/themes/constellations/"
								class="underline"
								target="_blank"
							>
								<abbr>IAU</abbr>
								<External size={12} />
							</a>
							. Ketikan jawaban pada petak yang disediakan, lalu tekan JAWAB (atau tekan{" "}
							<i>Enter</i>
							).
						</p>
						<p>
							Setelah menjawab, tebakan akan berubah warna, bergantung seberapa dekat rasi tebakan
							dengan rasi rahasia.
						</p>
					</div>
					<div class="flex flex-col gap-2 py-4">
						<p class="text-lg font-bold">Contoh: Centaurus</p>
						<img
							src="/centaurus.png"
							alt="Centaurus constellation"
							class="rounded-full object-cover sm:w-[80%] sm:h-[80%] mx-auto"
						/>
						<p>Kamu mencoba jawab:</p>
						<ul class="flex flex-col gap-3">
							<li>
								<div class="flex items-center justify-between">
									<p class="level-1 w-fit rounded-md px-2 py-1 text-red-500 dark:text-red-600 font-bold  shadow-md">
										Lacerta
									</p>
									<p>149°</p>
								</div>
								<p class="p-1">
									Warna merah menunjukkan rasi tebakan terlalu jauh. Jarak rasi lacerta dengan rasi
									centaurus adalah 149°.
								</p>
							</li>
							<li>
								<div class="flex items-center justify-between">
									<p class="level-2 w-fit rounded-md px-2 py-1 text-orange-500 dark:text-orange-600 font-bold shadow-md">
										Orion
									</p>
									<p>110°</p>
								</div>
								<p class="p-1">Warna jingga menunjukkan rasi tebakan agak jauh</p>
							</li>
							<li>
								<div class="flex items-center justify-between">
									<p class="level-3 w-fit rounded-md px-2 py-1 text-yellow-500 font-bold shadow-md">
										Crux
									</p>
									<p>12°</p>
								</div>
								<p class="p-1">Warna kuning menunjukkan rasi tebakan sudah dekat</p>
							</li>
							<li>
								<div class="flex items-center justify-between">
									<p class="level-3 w-fit rounded-md px-2 py-1 text-green-500 font-bold shadow-md">
										Centaurus
									</p>
									<p>0°</p>
								</div>
								<p class="p-1">Warna hijau berarti jawaban kamu benar 🥳</p>
							</li>
						</ul>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
