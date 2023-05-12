import { MenuService } from "@/services/MenuService"
import { route } from "@/utils/route"

export const get = route(async ({ query, session }) => {
    const { id } = query as { id: string }

    const menuService = new MenuService(session)

    const menu = await menuService.findOne(Number(id))

    if (!menu) {
        return { status: 404, body: { success: false } }
    }

    return { status: 200, body: { success: true, menu } }
})

export const post = route(async ({ body, session }) => {
    const { title, description } = body as { title: string; description: string }

    const menuService = new MenuService(session)

    const id = await menuService.create(title, description)

    return { status: 201, body: { success: true, id } }
})

export const patch = route(async ({ query, body, session }) => {
    const { id } = query as { id: string }
    const { title, description } = body as { title?: string; description?: string }

    const menuService = new MenuService(session)

    const updated = await menuService.update(Number(id), { title, description })

    if (updated == null) {
        return { status: 404, body: { success: false } }
    }

    return { status: 200, body: { success: true } }
})
