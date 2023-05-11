import Input from "@/components/Input"

import { editingMenu } from "../state"
import MenuEntryFormList from "./MenuEntryFormList"

type Props = {
    menuId?: string
}

export default function MenuForm(props: Props) {
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
