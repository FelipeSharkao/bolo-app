import type { Client, SessionService } from "./SessionService"

export class AuthService {
    private client: Client

    // FIXME: inject generic repository instead of supabase
    constructor(session: SessionService) {
        this.client = session.client
    }

    async login(email: string, password: string) {
        const { data, error } = await this.client.auth.signInWithPassword({ email, password })

        if (error || !data.user || !data.session) {
            return null
        }

        return {
            access_token: data.session.access_token,
            refresh_token: data.session.access_token,
            user_id: data.user.id,
        }
    }
}
