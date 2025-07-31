import { Children } from "@kitajs/html";
import { Hono } from "hono";
import { List } from "./list";
import { Root } from "../root";
import { getCookie } from "hono/cookie";
import { Constellation } from "./[c]";

export const constellation = new Hono();

function Layout({ children, darkMode, url }: { children: Children; darkMode: boolean; url: URL }) {
	return (
		<Root darkMode={darkMode} url={url}>
			{children}
		</Root>
	);
}

constellation.get("/constellation", (c) => {
	const url = new URL(c.req.url);
	const theme = getCookie(c, "__theme");
	return c.html(
		<Layout darkMode={theme === "dark"} url={url}>
			<List />
		</Layout>
	);
});

constellation.get("/constellation/:name", (c) => {
	const url = new URL(c.req.url);
	const theme = getCookie(c, "__theme");
	return c.html(
		<Layout darkMode={theme === "dark"} url={url}>
			<Constellation name={c.req.param().name} />
		</Layout>
	);
});