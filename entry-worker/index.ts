interface Env {
	WORKER_A: Fetcher;
	WORKER_B: Fetcher;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/worker-b/")) {
			return env.WORKER_B.fetch(request);
		}

		return env.WORKER_A.fetch(request);
	},
} satisfies ExportedHandler<Env>;
