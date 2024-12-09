import { defineConfig } from "vite";
import { cloudflare } from "@flarelabs-net/vite-plugin-cloudflare";
import { createMiddleware } from "@hattip/adapter-node";
import type { DevEnvironment } from "vite";

function assertIsFetchableDevEnvironment(
	environment: DevEnvironment | undefined
): asserts environment is DevEnvironment & {
	dispatchFetch(request: Request): Promise<Response>;
} {
	if (
		!environment ||
		typeof (environment as any).dispatchFetch !== "function"
	) {
		throw Error("Not a fetchable dev environment");
	}
}

export default defineConfig({
	plugins: [
		{
			name: "some-plugin",
			configureServer(viteDevServer) {
				const entryWorkerEnvironment = viteDevServer.environments.entryWorker;

				assertIsFetchableDevEnvironment(entryWorkerEnvironment);

				const middleware = createMiddleware(
					({ request }) => {
						return entryWorkerEnvironment.dispatchFetch(request);
					},
					{ alwaysCallNext: false }
				);

				return () => {
					viteDevServer.middlewares.use((req, res, next) => {
						middleware(req, res, next);
					});
				};
			},
		},
		cloudflare({
			configPath: "./entry-worker/wrangler.toml",
			// The default environment name is the Worker name with `-` replaced with `_`. Setting it here overrides it.
			viteEnvironment: { name: "entryWorker" },
			auxiliaryWorkers: [
				{ configPath: "./worker-a/wrangler.toml" },
				{ configPath: "./worker-b/wrangler.toml" },
			],
		}),
	],
});
