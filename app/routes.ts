import { type RouteConfig, layout, route } from "@remix-run/route-config";

export default [
	layout("./layout/index.tsx", [route("/", "./routes/home/index.tsx")]),
	route("/get-mystery/:mode", "./dal/get-mystery.ts"),
] satisfies RouteConfig;
