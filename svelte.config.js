import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		target: "#svelte",

		package: {
			dir: "dist",
			files: filepath => !/.stories.svelte|.test.ts/g.test(filepath),
		},
	},
};

export default config;
