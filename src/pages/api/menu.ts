import { MenuService } from "@/services/MenuService"
import { route } from "@/utils/route"

export const post = route(async ({ body, session }) => {
    const { title, description } = body as { title: string; description: string }

    const menuService = new MenuService(session)

    const menu = await menuService.create(title, description)

    return {
        status: 201,
        body: { success: true, menu },
    }
})
