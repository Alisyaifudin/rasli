import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useMode } from "~/hooks/use-mode";

export function ModeTab() {
	const [mode, changeMode] = useMode();

	return (
		<Tabs onValueChange={changeMode} value={mode} className="w-full sm:w-[400px]">
			<TabsList>
				<TabsTrigger value="comfy">Comfy</TabsTrigger>
				<TabsTrigger value="unlimited">Unlimited</TabsTrigger>
			</TabsList>
			<TabsContent value="comfy">
				<p className="text-sm text-slate-500 dark:text-slate-200">
					RASLI yang tersedia berbeda-beda tiap harinya. Kamu bisa bermain dengan `comfy` satu rasi
					per hari.
				</p>
			</TabsContent>
			<TabsContent value="unlimited">
				<p className="text-sm text-slate-500 dark:text-slate-200">
					Mode bermain terus menerus. Kamu bisa bermain dengan `unlimited` tanpa menunggu hari
					berikutnya.
				</p>
			</TabsContent>
		</Tabs>
	);
}

