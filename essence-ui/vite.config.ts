import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
			tsconfigPath: 'tsconfig.lib.json',
			rollupTypes: false, // bundles types into separate .d.ts files
			copyDtsFiles: true, // copies .d.ts files for css & ts
		}),
		libInjectCss(),
	],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'WpEssenceUI',
			formats: ['es'],
			fileName: 'index',
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
				assetFileNames: assetInfo => {
					if (/\.ttf$|\.woff2?$/.test(assetInfo.name ?? '')) {
						return 'fonts/[name][extname]';
					}
					if (assetInfo.name?.endsWith('.css')) {
						return 'style.css';
					}
					return 'assets/[name][extname]';
				},
				// preserveModules: true,
				// preserveModulesRoot: 'src',
				entryFileNames: '[name].js',
			},
		},
		cssCodeSplit: false,
		sourcemap: false,
	},
	resolve: {
		alias: {
			'@essence-ui': path.resolve(__dirname, './src'),
		},
	},
});
