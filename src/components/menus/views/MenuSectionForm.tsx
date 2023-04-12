import type { EditingMenuSectionState } from "../state"
import MenuEntryFormList from "./MenuEntryFormList"

type Props = {
    value: EditingMenuSectionState
}

export default function MenuSectionForm(props: Props) {
    const handleAddEntry = (type: "section" | "item") => {
        props.value.addEntry(type)
    }

    return (
        <article>
            <fieldset>
                <label for="title">Título</label>
                <input
                    type="text"
                    id="title"
                    value={props.value.title}
                    onChange={(ev) => props.value.setTitle(ev.currentTarget.value)}
                />
                <textarea
                    id="description"
                    value={props.value.description || ""}
                    onChange={(ev) => props.value.setDescription(ev.currentTarget.value || null)}
                />
            </fieldset>

            <fieldset>
                <label for="min">Mínimo</label>
                <input
                    type="number"
                    id="min"
                    value={props.value.min || ""}
                    onChange={(ev) => props.value.setMin(ev.currentTarget.valueAsNumber ?? null)}
                />
            </fieldset>

            <fieldset>
                <label for="max">Máximo</label>
                <input
                    type="number"
                    id="max"
                    value={props.value.max || ""}
                    onChange={(ev) => props.value.setMax(ev.currentTarget.valueAsNumber ?? null)}
                />
            </fieldset>

            <MenuEntryFormList entries={props.value.entries} onAddEntry={handleAddEntry} />
        </article>
    )
}
