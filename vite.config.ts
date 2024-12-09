import { defineConfig } from "vite";
import { cloudflare } from "@flarelabs-net/vite-plugin-cloudflare";

export default defineConfig({
	plugins: [
		cloudflare({
			configPath: "./entry-worker/wrangler.toml",
			auxiliaryWorkers: [
				{ configPath: "./worker-a/wrangler.toml" },
				{ configPath: "./worker-b/wrangler.toml" },
			],
		}),
	],
});
