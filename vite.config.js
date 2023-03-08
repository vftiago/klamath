import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";

export default defineConfig({
	define: {
		"global": "window",
		"process.env": process.env,
	},
	plugins: [glsl(), react()],
	resolve: {
		alias: {
			"node-fetch": "isomorphic-fetch",
		},
	},
});
