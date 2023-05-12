import { createEffect, untrack } from "solid-js"

import Input from "@/components/Input"
import type { Menu } from "@/types/menu"

import { editingMenu } from "../state"
import MenuEntryFormList from "./MenuEntryFormList"

type Props = {
    menu: Menu | null
}

export default function MenuForm(props: Props) {
    const load = () => {
        if (props.menu) {
            editingMenu.load(props.menu)
        }
    }

    // Load on SSR and re-load on hydration. This is necessary because I can't get Astro to
    // hydratate Solid's signals.
    untrack(load)
    createEffect(load)

    const handleAddEntry = (type: "section" | "item") => {
        if (type === "section") {
            editingMenu.addSection()
        }
    }

    return (
        <>
            <Input.Group>
                <Input.Label for="title">Título</Input.Label>
                <Input
                    type="text"
                    id="title"
                    value={editingMenu.title}
                    onChange={(value) => editingMenu.setTitle(value)}
                />
                <Input
                    type="textarea"
                    id="description"
                    value={editingMenu.description || ""}
                    onChange={(value) => editingMenu.setDescription(value || null)}
                />
            </Input.Group>

            <MenuEntryFormList
                allowItem={false}
                entries={editingMenu.sections}
                onAddEntry={handleAddEntry}
            />
        </>
    )
}
