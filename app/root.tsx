import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteLoaderData,
} from "@remix-run/react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./tailwind.css";
import { getThemeFromCookieHeader } from "./lib/theme-provider";
import { useMountLocalValue } from "./hooks/use-mount-local-value";
import { useState } from "react";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const theme = getThemeFromCookieHeader(cookieHeader);

	return { theme };
}

export function Layout({ children }: { children: React.ReactNode }) {
	const data = useRouteLoaderData<typeof loader>("root");
	const theme = data ? data.theme : "system";
	return (
		<html lang="id" className={theme === "dark" ? theme : undefined}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

const queryClient = new QueryClient();

export default function App() {
	const { mount, localValue, updateStats } = useMountLocalValue();
	const [openGraph, openGraphSetter] = useState(false);
	const setOpenGraph = (state: boolean) => openGraphSetter(state);
	return (
		<QueryClientProvider client={queryClient}>
			<Outlet
				context={{
					mount,
					localValue,
					updateStats,
					graph: {
						open: openGraph,
						setOpen: setOpenGraph,
					},
				}}
			/>
		</QueryClientProvider>
	);
}
