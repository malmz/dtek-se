/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
	readonly VITE_SESSION_SECRET: string;
	readonly VITE_AUTH_URL: string;
	readonly VITE_AUTH_CLIENT_ID: string;
	readonly VITE_AUTH_CLIENT_SECRET: string;
	readonly VITE_AUTH_REDIRECT_URI: string;
}

// eslint-disable-next-line no-shadow
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
