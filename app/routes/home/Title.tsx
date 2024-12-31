import { useMystery } from "~/dal/get-mystery";
import { useMode } from "~/hooks/use-mode";
import { useMount } from "~/hooks/use-mount";

export function Title() {
	const mount = useMount();
	const [mode] = useMode();
	const mystery = useMystery(mode);

	if (!mount || mystery === undefined)
		return <div className="bg-zinc-200 dark:bg-zinc-800 animate-pulse h-[32px] w-[128px]"></div>;
	return (
		<>
			<p className="text-2xl font-bold">{mystery}</p>
		</>
	);
}
