export default {
	async fetch(request) {
		return new Response("Response from Worker B");
	},
} satisfies ExportedHandler;
