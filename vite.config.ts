import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts';
import * as path from "path";
import {dependencies} from './package.json'
import {libInjectCss} from 'vite-plugin-lib-inject-css';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),libInjectCss(),dts({
      insertTypesEntry: true,
    }),],
   test: {
    globals: true,           // Use describe, it, expect without imports
    environment: 'jsdom',    // Use jsdom for DOM APIs
    setupFiles: './src/setupTests.ts',
  }, 
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
  build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "multi-stepper",
        fileName: (format) => `multi-stepper.${format}.js`,
      },
      rollupOptions: {
        external: Object.keys(dependencies),
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
      cssCodeSplit: false,
      sourcemap: false,
      emptyOutDir: true,
       minify: 'esbuild'
    },
    
})
