/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_URL: string;
}

// eslint-disable-next-line no-shadow
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
