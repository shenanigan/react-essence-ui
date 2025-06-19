import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@essence-ui': path.resolve(__dirname, '../essence-ui/src'),
		},
	},
	server: {
		fs: {
			allow: ['./src', '../essence-ui/src'],
		},
	},
});
