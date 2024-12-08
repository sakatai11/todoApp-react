import {
  BrowserRouter,
} from "react-router-dom";

import React from "react";
import ReactDOM from "react-dom/client";
import AppRouters from "./AppRouters";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppRouters />
		</BrowserRouter>
	</React.StrictMode>
);
