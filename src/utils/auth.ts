import { SessionService } from "@/services/SessionService"
import type { AstroGlobal } from "astro"

export async function auth(astro: AstroGlobal) {
    const session = await SessionService.fromCookies(astro.cookies)

    if (!session.current) {
        return { redirect: astro.redirect("/login") }
    }

    return { session }
}
