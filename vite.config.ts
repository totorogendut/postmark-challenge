/// <reference types="vitest" />
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {},
	ssr: {
		external: ["@node-rs/argon2-wasm32-wasi"],
	},
	test: {},
});
