export type Menu = {
    id: number | null
    title: string
    description: string | null
    sections: MenuSection[]
}

export type MenuEntry = MenuSection | MenuItem

export type MenuSection = {
    type: "section"
    id: number | null
    title: string
    description: string | null
    entries: MenuEntry[]
    min: number | null
    max: number | null
}

export type MenuItem = {
    type: "item"
    id: number | null
    title: string
    description: string | null
    price: number
    min: number | null
    max: number | null
}
