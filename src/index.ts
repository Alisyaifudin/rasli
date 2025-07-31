import { Hono } from "hono";
import { home } from "./home";
import { constellation } from "./constellation";

const app = new Hono();

app.route("/", home);
app.route("/", constellation);

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return app.fetch(request);
	},
} satisfies ExportedHandler<Env>;
