import { type RouteConfig, layout, route } from "@remix-run/route-config";

export default [layout("./layout/index.tsx", [route("/", "./routes/home.tsx")])] satisfies RouteConfig;
