import { useMount } from "~/hooks/use-mount";

export function Title() {
	const mount = useMount();
	// const result = useAppSelector((state) => state.meta[mode].result);

	if (!mount) return <div>loading...</div>;
	return <h2 className="text-2xl font-bold">aloha!</h2>;
}
