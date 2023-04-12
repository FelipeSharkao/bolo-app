import { createClient, SupabaseClient, type Session } from "@supabase/supabase-js"
import type { Database } from "@/types/_generated/supabase"
import type { AstroCookies } from "astro"

const SECURE_COOKIE = {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
    path: "/",
} as const

if (!import.meta.env.SUPABASE_URL || !import.meta.env.SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase URL or anon key")
}

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY

export type Client = SupabaseClient<Database>

/**
 * A service that manages the user's session. It is responsible for storing and retrieving the
 * session from the client.
 */
export class SessionService {
    private constructor(
        readonly client: Client,
        private session: Session | null,
        private cookies: AstroCookies,
    ) {
        client.auth.onAuthStateChange((_, session) => {
            this.session = session

            if (session) {
                this.cookies.set("access_token", session.access_token, SECURE_COOKIE)
                this.cookies.set("refresh_token", session.refresh_token, SECURE_COOKIE)
            }
        })
    }

    /**
     * Creates a new session service from Astro cookies.
     *
     * @param cookies The cookies to use.
     * @returns The session service.
     */
    static async fromCookies(cookies: AstroCookies) {
        const client = createClient(supabaseUrl, supabaseAnonKey)

        const accessToken = cookies.get("access_token").value
        const refreshToken = cookies.get("refresh_token").value

        let session: Session | null = null

        if (accessToken && refreshToken) {
            const { data } = await client.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            })

            session = data.session
        }

        return new SessionService(client, session, cookies)
    }

    /**
     * Gets the current supabase session, or `null` if the client is not authenticated.
     */
    get current() {
        return this.session
    }
}
