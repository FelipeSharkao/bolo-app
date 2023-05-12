import { AuthenticationError } from "@/utils/errors"

import type { SessionService } from "./SessionService"

export class MenuService {
    constructor(private session: SessionService) {}

    async create(title: string, description: string) {
        if (!this.session.current) {
            throw new AuthenticationError()
        }

        console.log("create menu", {
            user_id: this.session.current.user.id,
            title,
            description,
        })

        const { data } = await this.session.client
            .from("menus")
            .insert({
                user_id: this.session.current.user.id,
                title,
                description,
            })
            .select("id")

        // TODO: handle error
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return data![0].id
    }
}
