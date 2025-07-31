import { Hono } from "hono";
import { home } from "./home";
import { constellation } from "./constellation";
import { serveStatic } from "hono/cloudflare-pages";

const app = new Hono();

app.route("/", home);
app.route("/", constellation);
app.use("*", serveStatic());

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return app.fetch(request, env);
	},
} satisfies ExportedHandler<Env>;
