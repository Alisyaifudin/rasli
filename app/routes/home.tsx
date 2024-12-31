import type { MetaFunction } from "@remix-run/cloudflare";
import { ThemeToggle } from "~/components/ThemeToggle";

export const meta: MetaFunction = () => {
	return [{ title: "Rasli" }, { name: "description", content: "Selamat datang di rasli!" }];
};

export default function Page() {
	return (
		<div className="flex h-screen items-center justify-center">
			<ThemeToggle />
		</div>
	);
}
