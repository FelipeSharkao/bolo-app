import { state } from "solid-sm"
import type { Object } from "ts-toolbelt"

import type { Menu, MenuItem, MenuSection } from "@/types/menu"
import axios from "axios"

export type EditingMenuState = Object.Merge<
    {
        sections: EditingMenuSectionState[]

        setTitle(title: string): void
        setDescription(description: string | null): void
        addSection(): EditingMenuSectionState

        load(id: string | null): Promise<void>
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
    id: "",
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

        if (id) {
            // unimplemented
            return
        }

        // TODO: move API calls to a dedicated file
        const { data } = await axios.post("/api/menu", {
            title: this.title,
            description: this.description,
        })

        if (data.success) {
            set("id", data.id)
        }
    },
}))

const createSection = (remove: () => void): EditingMenuSectionState => {
    return state((set) => ({
        type: "section",
        id: "",
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
        id: "",
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
