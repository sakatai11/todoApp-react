import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	base: process.env.GITHUB_PAGES ? "/todo-vite" : "./",
	plugins: [react()],
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
