/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		session: import('svelte-kit-cookie-session').Session<
			import('./session').SessionData
		>;
		cookies: Record<string, string>;
		dtek: import('$lib/client').DtekClient;
	}

	// interface Platform {}

	// interface Session {}

	// interface Stuff {}
}
