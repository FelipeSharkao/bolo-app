import type { EditingMenuItemState } from "../state"

type Props = {
    value: EditingMenuItemState
}

export default function MenuItemForm(props: Props) {
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

            <fieldset>
                <label for="price">Price</label>
                <input
                    type="number"
                    id="price"
                    value={props.value.price || ""}
                    onChange={(ev) => props.value.setPrice(ev.currentTarget.valueAsNumber ?? null)}
                />
            </fieldset>
        </article>
    )
}
