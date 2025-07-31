import { Tab, TabContent } from "./ui/tab";

export function ModeTab() {
	return (
		<Tab id="mode-tab" class="w-full sm:w-[400px]" value="comfy">
			<TabContent value="comfy" trigger="Comfy">
				<p class="text-sm text-slate-500 dark:text-slate-200">
					RASLI yang tersedia berbeda-beda tiap harinya. Kamu bisa bermain dengan `comfy` satu rasi
					per hari.
				</p>
			</TabContent>
			<TabContent value="unlimited" trigger="Unlimited">
				<p class="text-sm text-slate-500 dark:text-slate-200">
					Mode bermain terus menerus. Kamu bisa bermain dengan `unlimited` tanpa menunggu hari
					berikutnya.
				</p>
			</TabContent>
		</Tab>
	);
}
