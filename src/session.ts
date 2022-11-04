import type { SigninState, TokenState } from '$lib/auth/api';

export interface SessionData {
	signin?: SigninState;
	tokens?: TokenState;
}
