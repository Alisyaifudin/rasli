import { type RouteConfig, layout, route } from "@remix-run/route-config";

export default [
	layout("./layout/index.tsx", [
		route("/", "./routes/home/index.tsx"),
		route("/constellation", "./routes/constellation/index.tsx"),
		route("/constellation/:c", "./routes/constellation/[c].tsx"),
		route("/article", "./routes/article/index.tsx"),
	]),
] satisfies RouteConfig;
