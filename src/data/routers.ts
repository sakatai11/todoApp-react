import { type RouteProps } from "react-router-dom";
import Index from "../pages";
import Top from "../pages/top";
import Login from "../pages/login";

export const routes = [
	{
		path: "/",
		Component: Index,
	},
	{
		path: "/login",
		Component: Login,
	},
	{
		path: "/top",
		Component: Top,
	},
] as const satisfies RouteProps[];
