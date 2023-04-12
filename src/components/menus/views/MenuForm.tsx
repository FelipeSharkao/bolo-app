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
            <fieldset>
                <label for="title">Título</label>
                <input
                    type="text"
                    id="title"
                    value={editingMenu.title}
                    onChange={(ev) => editingMenu.setTitle(ev.currentTarget.value)}
                />
                <textarea
                    id="description"
                    value={editingMenu.description || ""}
                    onChange={(ev) => editingMenu.setDescription(ev.currentTarget.value || null)}
                />
            </fieldset>

            <MenuEntryFormList
                allowItem={false}
                entries={editingMenu.sections}
                onAddEntry={handleAddEntry}
            />
        </>
    )
}
