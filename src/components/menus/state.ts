import axios from "axios"
import { pick } from "lodash"
import { createEffect, untrack } from "solid-js"
import { state } from "solid-sm"
import type { Object } from "ts-toolbelt"

import type { Menu, MenuItem, MenuSection } from "@/types/menu"
import { Base58 } from "@/utils/Base58"
import { debounce } from "@/utils/debounce"

export type EditingMenuState = Object.Merge<
    {
        sections: EditingMenuSectionState[]

        setTitle(title: string): void
        setDescription(description: string | null): void
        addSection(): EditingMenuSectionState

        load(id: number | null): Promise<void>
    },
    Menu
>

export type EditingMenuEntryState = EditingMenuSectionState | EditingMenuItemState

export type EditingMenuSectionState = Object.Merge<
    {
        entries: EditingMenuEntryState[]

        setTitle(title: string): void
        setDescription(description: string | null): void
        setMax(max: number | null): void
        setMin(min: number | null): void
        addEntry(type: "item" | "section"): EditingMenuEntryState
        remove(): void
    },
    MenuSection
>

export type EditingMenuItemState = Object.Merge<
    {
        setTitle(title: string): void
        setDescription(description: string | null): void
        setMax(max: number | null): void
        setMin(min: number | null): void
        setPrice(price: number): void
        remove(): void
    },
    MenuItem
>

export const editingMenu = state<EditingMenuState>((set) => ({
    id: null,
    title: "",
    description: "",
    sections: [],

    setTitle(title) {
        set({ title })
    },

    setDescription(description) {
        set({ description })
    },

    addSection() {
        const section = createSection(() =>
            set("sections", (sections) => sections.filter((s) => s !== section)),
        )
        set("sections", (sections) => [...sections, section])
        return section
    },

    async load(id) {
        console.log("load", id)

        if (!id) {
            return
        }

        // unimplemented
    },
}))

const createSection = (remove: () => void): EditingMenuSectionState => {
    return state((set) => ({
        type: "section",
        id: null,
        title: "",
        description: "",
        min: null,
        max: null,
        entries: [],

        setTitle(title) {
            set({ title })
        },

        setDescription(description) {
            set({ description })
        },

        setMax(max) {
            set({ max })
        },

        setMin(min) {
            set({ min })
        },

        addEntry(type: "item" | "section") {
            const create = type === "item" ? createItem : createSection
            const entry: EditingMenuEntryState = create(() =>
                set("entries", (entries) => entries.filter((e) => e !== entry)),
            )
            set("entries", (entries) => [...entries, entry])
            return entry
        },

        remove() {
            remove()
        },
    }))
}

const createItem = (remove: () => void): EditingMenuItemState => {
    return state((set) => ({
        type: "item",
        id: null,
        title: "",
        description: "",
        min: null,
        max: null,
        price: 0,

        setTitle(title) {
            set({ title })
        },

        setDescription(description) {
            set({ description })
        },

        setMax(max) {
            set({ max })
        },

        setMin(min) {
            set({ min })
        },

        setPrice(price) {
            set({ price })
        },

        remove() {
            remove()
        },
    }))
}

const debouncedMenu = debounce(() => pick(editingMenu, "title", "description"), 500)

// Save the menu to the server
createEffect(() => {
    let id = untrack(() => editingMenu.id)
    const { title, description } = debouncedMenu()

    if (!title) {
        return
    }

    // TODO: move API calls to a dedicated file
    async function save() {
        console.log("save menu", { title, description })

        if (id) {
            // unimplemented
        } else {
            const { data } = await axios.post("/api/menu", { title, description })

            if (!data.success) {
                return
            }

            id = data.id
        }

        if (location.pathname === "/m/new") {
            const hash = Base58.encode(Number(id))
            history.replaceState(history.state, "", `/m/${hash}/edit`)
        }
    }

    save()
})
