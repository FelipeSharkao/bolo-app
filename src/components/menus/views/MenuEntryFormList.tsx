import { For, Show } from "solid-js"
import type { EditingMenuEntryState, EditingMenuItemState, EditingMenuSectionState } from "../state"
import MenuSectionForm from "./MenuSectionForm"
import MenuItemForm from "./MenuItemForm"

type Props = {
    entries: EditingMenuEntryState[]
    onAddEntry: (type: "section" | "item") => void
    allowItem?: boolean
    allowSection?: boolean
}

export default function MenuEntryFormList(props: Props) {
    const allowItem = () => props.allowItem !== false
    const allowSection = () => props.allowSection !== false

    const handleAddEntry = (type: "section" | "item") => {
        props.onAddEntry(type)
    }

    const items = () => {
        return props.entries.filter((entry): entry is EditingMenuItemState => {
            return entry.type === "item"
        })
    }

    const sections = () => {
        return props.entries.filter((entry): entry is EditingMenuSectionState => {
            return entry.type === "section"
        })
    }

    return (
        <>
            <For each={items()}>{(item) => <MenuItemForm value={item} />}</For>
            <For each={sections()}>{(section) => <MenuSectionForm value={section} />}</For>

            <details role="list">
                <summary aria-haspopup="listbox">Adicionar</summary>
                <ul role="listbox">
                    <Show when={allowItem()}>
                        <li onClick={[handleAddEntry, "item"]}>Adicionar item</li>
                    </Show>
                    <Show when={allowSection}>
                        <li onClick={[handleAddEntry, "section"]}>Adicionar seção</li>
                    </Show>
                </ul>
            </details>
        </>
    )
}
