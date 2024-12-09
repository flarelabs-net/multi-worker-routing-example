export default {
	async fetch(request) {
		return new Response("Response from Worker A");
	},
} satisfies ExportedHandler;
