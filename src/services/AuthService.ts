import type { Client, SessionService } from "./SessionService"

/**
 * A service that manages authentication. It is responsible for logging in, logging out, and signing
 * up users.
 */
export class AuthService {
    private client: Client

    // FIXME: inject generic repository instead of supabase
    constructor(session: SessionService) {
        this.client = session.client
    }

    /**
     * Logs in a user in. If the login is successful, the user's session will be stored in the
     * session service.
     *
     * @param email The user's email.
     * @param password The user's password.
     * @returns The generated tokens, or `null` if the login failed.
     */
    async login(email: string, password: string) {
        const { data, error } = await this.client.auth.signInWithPassword({ email, password })

        if (error || !data.user || !data.session) {
            return null
        }

        return {
            access_token: data.session.access_token,
            refresh_token: data.session.access_token,
        }
    }
}
