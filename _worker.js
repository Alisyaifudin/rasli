import app from "./index.js";

export default {
	async fetch(request, env, ctx) {
		// Pass the request to your Hono app
		return app.fetch(request, env, ctx);
	},
};
