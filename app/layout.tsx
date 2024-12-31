import { Outlet } from "@remix-run/react";
import { ThemeToggle } from "./components/ThemeToggle";

export default function RootLayout() {
	console.log("hellooooo");
	return (
		<>
			<header>
				<nav className="sticky top-0 z-50 bg-blue-500 p-2 text-white dark:bg-zinc-900">
					<div className="mx-auto flex max-w-4xl items-center justify-between">
						<div className="flex gap-4">
							{/* <Info /> */}
							<ThemeToggle />
						</div>
						<div className="flex items-end overflow-hidden text-sm">
							<h1 className="overflow-hidden text-ellipsis text-4xl font-bold ">RASLI</h1>
							<p className="overflow-hidden text-ellipsis">v1.0.0</p>
						</div>
						<div className="flex gap-4">
							{/* <Graph />
							<Setting /> */}
						</div>
					</div>
				</nav>
			</header>
			<Outlet />
			<footer>This is footer</footer>
		</>
	);
}
