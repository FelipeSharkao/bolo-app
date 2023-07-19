import type { MenuEntry, MenuItem, MenuSection } from "@/types/menu"
import { AuthenticationError } from "@/utils/errors"

import type { SessionService } from "./SessionService"

type MenuUpdate = {
    title?: string
    description?: string
}

export class MenuService {
    constructor(private session: SessionService) {}

    async findOne(id: number) {
        console.log("find menu", id)

        const { data } = await this.session.client
            .from("menus")
            .select("id,title,description")
            .eq("id", id)
            .single()

        if (!data) {
            console.log("menu not found", id)
            return null
        }

        console.log("menu", id, data)

        const loadEntries = async (parentId?: number): Promise<MenuEntry[]> => {
            console.log("load entries", id, parentId)

            const query = this.session.client
                .from("menu_entries")
                .select("id,title,description,min,max,price,is_section")
                .order("id")

            if (parentId == null) {
                query.eq("menu_id", id)
            } else {
                query.eq("parent_id", parentId)
            }

            const { data } = await query

            console.log("entries", id, parentId, data)

            return Promise.all(
                (data || []).map(async (entry) => {
                    if (entry.is_section) {
                        return {
                            ...entry,
                            entries: await loadEntries(entry.id),
                            type: "section",
                        } as MenuSection
                    }

                    return { ...entry, type: "item" } as MenuItem
                }),
            )
        }

        return { ...data, sections: (await loadEntries()) as MenuSection[] }
    }

    async find(skip: number, limit: number) {
        const uid = this.session.current?.user.id
        if (!uid) {
            throw new AuthenticationError()
        }

        console.log("find menus", skip, limit, uid)

        const { data } = await this.session.client
            .from("menus")
            .select("id,title")
            .eq("user_id", uid)
            .range(skip, skip + limit)
            .order("updated_at", { ascending: false })

        return data || []
    }

    async create(title: string, description: string) {
        const uid = this.session.current?.user.id
        if (!uid) {
            throw new AuthenticationError()
        }

        const menu = { user_id: uid, title, description }

        console.log("create menu", menu)

        const { data } = await this.session.client.from("menus").insert(menu).select("id").single()

        // TODO: handle error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return data!.id
    }

    async update(id: number, update: MenuUpdate) {
        const uid = this.session.current?.user.id
        if (!uid) {
            throw new AuthenticationError()
        }

        console.log("update menu", id, update, uid)

        const { data } = await this.session.client
            .from("menus")
            .update(update)
            .eq("id", id)
            .eq("user_id", uid)
            .select("id")
            .single()

        // TODO: handle error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return data?.id ?? null
    }
}
