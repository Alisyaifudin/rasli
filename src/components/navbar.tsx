import { VERSION } from "~/lib/constants";
import { Info } from "./info";
import { ThemeBtn } from "./theme-btn";
import { Graph } from "./graph";
import { Settings } from "./setting";

export function Navbar({ pathname, mode }: { pathname: string; mode: "comfy" | "unlimited" }) {
	return (
		<header>
			<nav class="sticky top-0 z-50 bg-blue-500 p-2 text-white dark:bg-zinc-900">
				<div class="mx-auto flex max-w-4xl items-center justify-between">
					<div class="flex gap-4">
						{pathname === "/" ? <Info /> : null}
						<ThemeBtn />
					</div>
					<div class="flex items-end overflow-hidden text-sm">
						<a
							href="/"
							class="overflow-hidden text-ellipsis text-3xl xs:text-4xl font-bold "
						>
							RASLI
						</a>
						<div class="flex flex-col items-start">
							{pathname === "/" ? (
								<p class="text-xs xs:text-sm" id="title-mode">
									{mode}
								</p>
							) : (
								<p class="text-xs xs:text-sm">&nbsp;</p>
							)}
							<p class="text-xs xs:text-sm">v{VERSION}</p>
						</div>
					</div>
					{pathname === "/" ? (
						<div class="flex gap-4">
							<Graph mode={mode} />
							<Settings />
						</div>
					) : (
						<div class="w-[80px]" />
					)}
				</div>
			</nav>
		</header>
	);
}
