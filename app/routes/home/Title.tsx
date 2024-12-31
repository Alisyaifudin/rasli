import { useMount } from "~/hooks/use-mount";

interface Props {
	name?: string;
}

export function Title({ name }: Props) {
	const mount = useMount();

	if (!mount || !name)
		return <div className="bg-zinc-200 dark:bg-zinc-800 animate-pulse h-[32px] w-[128px]"></div>;
	return (
		<>
			<p className="text-2xl font-bold">{name}</p>
		</>
	);
}
