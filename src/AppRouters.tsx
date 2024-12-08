import { routes } from "./data/routers";
import { Route, Routes } from "react-router-dom";

function AppRouters() {
	return (
		<>
			<Routes>
				{routes.map(({ path, Component }, i) => (
					<Route key={i} path={path} element={<Component />} />
				))}
			</Routes>
		</>
	);
}

export default AppRouters;
