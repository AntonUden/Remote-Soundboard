import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from './express-plugin'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), express("src/server")],
	optimizeDeps: {
		include: ['websocket-ts'],
		esbuildOptions: {
			format: 'esm',
		},
	},
	server: {
		port: 8123
	}
});
