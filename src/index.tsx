import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppContainer from "./components/AppContainer";

const root = document.getElementById("root");

createRoot(root!).render(
	<React.StrictMode>
		<AppContainer />
	</React.StrictMode>,
);
