import type { AstroGlobal } from "astro"

import { SessionService } from "@/services/SessionService"

export async function auth(astro: AstroGlobal) {
    const session = await SessionService.fromCookies(astro.cookies)

    if (!session.current) {
        return { redirect: astro.redirect("/login") }
    }

    return { session }
}
