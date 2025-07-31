import { Children } from "@kitajs/html";
import { Hono } from "hono";
import { Home } from "./home";
import { Root } from "../root";
import { getCookie } from "hono/cookie";

export const home = new Hono();

function Layout({ children, darkMode, url }: { children: Children; darkMode: boolean; url: URL }) {
	return (
		<Root darkMode={darkMode} url={url}>
			{children}
		</Root>
	);
}

home.get("/", (c) => {
	const url = new URL(c.req.url);
	const theme = getCookie(c, "__theme");
	return c.html(
		<Layout darkMode={theme === "dark"} url={url}>
			<Home />
		</Layout>
	);
});
