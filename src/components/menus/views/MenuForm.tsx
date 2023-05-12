import { createResource } from "solid-js"

import Input from "@/components/Input"

import { editingMenu } from "../state"
import MenuEntryFormList from "./MenuEntryFormList"
import { Base58 } from "@/utils/Base58"

type Props = {
    menuId: string | null
}

export default function MenuForm(props: Props) {
    const [loaded] = createResource(
        () => props.menuId || "",
        (id) => editingMenu.load(id ? Base58.decode(id) : null)
    )

    const handleAddEntry = (type: "section" | "item") => {
        if (type === "section") {
            editingMenu.addSection()
        }
    }

    return (
        <>
            {loaded()}
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
