import { AuthService } from "@/services/AuthService"
import { route } from "@/utils/route"

export const post = route(async ({ body, session }) => {
    const authService = new AuthService(session)

    // FIXME: validate body
    const { email, password } = body as { email: string; password: string }

    const login = await authService.login(email, password)

    if (!login) {
        return { status: 400, body: { success: false, error: "Invalid credentials" } }
    }

    return { body: { success: true, ...login } }
})
