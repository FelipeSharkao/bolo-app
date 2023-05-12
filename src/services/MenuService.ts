import { AuthenticationError } from "@/utils/errors"

import type { SessionService } from "./SessionService"

type MenuUpdate = {
    title?: string
    description?: string
}

export class MenuService {
    constructor(private session: SessionService) {}

    async findOne(id: number) {
        if (!this.session.current) {
            throw new AuthenticationError()
        }

        console.log("find menu", id)

        const { data } = await this.session.client
            .from("menus")
            .select("id,title,description")
            .eq("id", id)
            .single()

        return data
    }

    async create(title: string, description: string) {
        if (!this.session.current) {
            throw new AuthenticationError()
        }

        const menu = {
            user_id: this.session.current.user.id,
            title,
            description,
        }

        console.log("create menu", menu)

        const { data } = await this.session.client.from("menus").insert(menu).select("id").single()

        // TODO: handle error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return data!.id
    }

    async update(id: number, update: MenuUpdate) {
        if (!this.session.current) {
            throw new AuthenticationError()
        }

        console.log("update menu", id, update)

        const { data } = await this.session.client
            .from("menus")
            .update(update)
            .eq("id", id)
            .select("id")
            .single()

        // TODO: handle error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return data?.id
    }
}
