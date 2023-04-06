import { createClient, SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"
import type { AstroCookies } from "astro"

const SECURE_COOKIE = {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: "lax",
} as const

if (!import.meta.env.SUPABASE_URL || !import.meta.env.SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase URL or anon key")
}

const supabaseUrl = import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY

export type Client = SupabaseClient<Database>

export class SessionService {
    private constructor(readonly client: Client, private cookies: AstroCookies) {
        client.auth.onAuthStateChange((_, session) => {
            if (session) {
                this.cookies.set("access_token", session.access_token, SECURE_COOKIE)
                this.cookies.set("refresh_token", session.refresh_token, SECURE_COOKIE)
            } else {
                this.cookies.delete("access_token")
                this.cookies.delete("refresh_token")
            }
        })
    }

    static async fromCookies(cookies: AstroCookies) {
        const client = createClient(supabaseUrl, supabaseAnonKey)

        const accessToken = cookies.get("access_token").value
        const refreshToken = cookies.get("refresh_token").value

        if (accessToken && refreshToken) {
            await client.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            })
        }

        return new SessionService(client, cookies)
    }
}
