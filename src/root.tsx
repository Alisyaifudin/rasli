import { Children } from "@kitajs/html";
import { Navbar } from "./components/navbar";
import z from "zod";

export function Root({
	children,
	darkMode,
	url,
}: {
	children?: Children;
	darkMode: boolean;
	url: URL;
}) {
	const pathname = url.pathname;
	const search = url.searchParams;
	const parsed = z.enum(["comfy", "unlimited"]).safeParse(search.get("mode"));
	const mode = parsed.success ? parsed.data : "comfy";
	return (
		<>
			{"<!DOCTYPE html>"}
			<html lang="id" class={darkMode ? "dark" : ""}>
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Rasli</title>
					<link href="/global.css" rel="stylesheet"></link>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
					></link>
					<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.6/dist/htmx.min.js"></script>
					<script src="/scripts/share/random.js" type="module"></script>
					<script src="/scripts/share/zod.js" type="module"></script>
					<script src="/scripts/share/sky.js" type="module"></script>
					<script src="/scripts/share/portal.js" type="module"></script>
					<script src="/scripts/share/utils.js" type="module"></script>
					<script src="/scripts/theme-btn.js" type="module"></script>
					<script src="/scripts/dialog.js" type="module"></script>
					<script src="/scripts/tab.js" type="module"></script>
				</head>
				<body class="relative">
					{/* <div class="animate-in animate-out" /> */}
					<Navbar pathname={pathname} mode={mode} />
					{children}
					<footer class="bg-slate-950 px-3 pt-3">
						<ul class="flex flex-col gap-2 text-sm text-muted-foreground underline max-w-xl w-full mx-auto">
							{pathname === "/" ? null : (
								<li>
									<a hx-boost="true" href="/">
										Game
									</a>
								</li>
							)}
							{pathname.startsWith("/constellation") ? null : (
								<li>
									<a hx-boost="true" href="/constellation">
										Daftar Rasi Bintang
									</a>
								</li>
							)}
						</ul>
						<div class="flex justify-between text-[0.7rem] py-4 text-muted-foreground">
							<p>
								© 2024-{new Date().getFullYear()}{" "}
								<a href="https://alisyaifudin.pages.dev/">Muhammad Ali Syaifudin</a>
							</p>
							<a class="underline" href="https://bit.ly/HadiahTerimaKasih">
								Terimakasih!
							</a>
						</div>
					</footer>
					<div id="portal-element" />
				</body>
			</html>
		</>
	);
}
