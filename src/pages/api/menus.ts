import { MenuService } from "@/services/MenuService"
import { route } from "@/utils/route"

export const get = route(async ({ query, session }) => {
    const { skip, limit } = query as { skip?: string; limit?: string }

    const menuService = new MenuService(session)

    const menus = await menuService.find(Number(skip || 0), Number(limit || 10))

    return { status: 200, body: { success: true, menus } }
})
