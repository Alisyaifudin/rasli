import { Link, Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Info } from "./Info";
import { CONST } from "~/lib/constants";
import { Settings } from "./Settings";
import { Graph } from "./Graph";
import { useMode } from "~/hooks/use-mode";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const pathname = url.pathname;
	return { pathname };
}

export default function RootLayout() {
	const { pathname } = useLoaderData<typeof loader>();
	const context = useOutletContext();
	const [mode] = useMode();
	return (
		<>
			<header>
				<nav className="sticky top-0 z-50 bg-blue-500 p-2 text-white dark:bg-zinc-900">
					<div className="mx-auto flex max-w-4xl items-center justify-between">
						<div className="flex gap-4">
							{pathname === "/" ? <Info /> : null}
							<ThemeToggle />
						</div>
						<div className="flex items-end overflow-hidden text-sm">
							<Link
								prefetch="intent"
								to="/"
								className="overflow-hidden text-ellipsis text-3xl xs:text-4xl font-bold "
							>
								RASLI
							</Link>
							<div className="flex flex-col items-start">
								{pathname === "/" ? (
									<p className="text-xs xs:text-sm">{mode}</p>
								) : (
									<p className="text-xs xs:text-sm">&nbsp;</p>
								)}
								<p className="text-xs xs:text-sm">v{CONST.VERSION}</p>
							</div>
						</div>
						{pathname === "/" ? (
							<div className="flex gap-4">
								<Graph />
								<Settings />
							</div>
						) : (
							<div className="w-[80px]" />
						)}
					</div>
				</nav>
			</header>
			<Outlet context={context} />
			<footer className="bg-slate-950 px-3 pt-10">
				<ul className="flex flex-col gap-2 text-sm text-muted-foreground underline max-w-xl w-full mx-auto">
					{pathname === "/" ? null : (
						<li>
							<Link to="/">Game</Link>
						</li>
					)}
					{pathname.startsWith("/constellation") ? null : (
						<li>
							<Link to="/constellation">Daftar Rasi Bintang</Link>
						</li>
					)}
					{pathname.startsWith("/article") ? null : (
						<li>
							<Link to="/article">Artikel Teknis</Link>
						</li>
					)}
				</ul>
				<div className="flex justify-between text-[0.7rem] py-4 text-muted-foreground">
					<p>
						© 2024-{new Date().getFullYear()}{" "}
						<a href="https://alisyaifudin.pages.dev/">Muhammad Ali Syaifudin</a>
					</p>
					<a className="underline" href="https://bit.ly/HadiahTerimaKasih">
						Terimakasih!
					</a>
				</div>
			</footer>
		</>
	);
}
