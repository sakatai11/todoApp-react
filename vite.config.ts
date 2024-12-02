import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.GITHUB_PAGES ? "/todo-vite" : "./",
	plugins: [
		react(),
		tsconfigPaths()
	],
	// build: {
	//   rollupOptions: {
	//     output: {
	//       manualChunks: {
	//         vendor: ['react', 'react-dom'],
	//       },
	//     },
	//   },
	// },
});
