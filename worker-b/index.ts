export default {
	async fetch(request) {
		return new Response("Hello from Worker B");
	},
} satisfies ExportedHandler;