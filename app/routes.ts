import { type RouteConfig, route } from "@remix-run/route-config";

export default [route("/", "./routes/home.tsx")] satisfies RouteConfig;
