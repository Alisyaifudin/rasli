import { Outlet, useOutletContext } from "@remix-run/react";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Info } from "./Info";
import { CONST } from "~/lib/constants";
import { Settings } from "./Settings";
import { Toaster } from "~/components/ui/toaster";
import { Graph } from "./Graph";
import { useMode } from "~/hooks/use-mode";

export default function RootLayout() {
	const context = useOutletContext();
	const [mode] = useMode()
	return (
		<>
			<header>
				<nav className="sticky top-0 z-50 bg-blue-500 p-2 text-white dark:bg-zinc-900">
					<div className="mx-auto flex max-w-4xl items-center justify-between">
						<div className="flex gap-4">
							<Info />
							<ThemeToggle />
						</div>
						<div className="flex items-end overflow-hidden text-sm">
							<h1 className="overflow-hidden text-ellipsis text-4xl font-bold ">RASLI</h1>
							<div className="flex flex-col items-start">
								<p>{mode}</p>
								<p>v{CONST.VERSION}</p>
							</div>
						</div>
						<div className="flex gap-4">
							<Graph />
							<Settings />
						</div>
					</div>
				</nav>
			</header>
			<Outlet context={context} />
			<Toaster />
			<footer>This is footer</footer>
		</>
	);
}
