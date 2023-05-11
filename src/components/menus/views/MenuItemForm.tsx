import { useActions } from "solid-sm"

import Card from "@/components/Card"
import Input from "@/components/Input"
import NumberInput from "@/components/NumberInput"

import type { EditingMenuItemState } from "../state"

type Props = {
    value: EditingMenuItemState
}

export default function MenuItemForm(props: Props) {
    const [setTitle, setDescription, setMin, setMax, setPrice] = useActions(
        () => props.value,
        "setTitle",
        "setDescription",
        "setMin",
        "setMax",
        "setPrice",
    )

    return (
        <Card>
            <Input.Group>
                <Input.Label for="title">Título</Input.Label>
                <Input type="text" id="title" value={props.value.title} onChange={setTitle} />
                <Input
                    type="textarea"
                    id="description"
                    value={props.value.description || ""}
                    onChange={setDescription}
                />
            </Input.Group>

            <Input.Group>
                <Input.Label for="min">Mínimo</Input.Label>
                <NumberInput id="min" nullable value={props.value.min || ""} onChange={setMin} />
            </Input.Group>

            <Input.Group>
                <Input.Label for="max">Máximo</Input.Label>
                <NumberInput id="max" nullable value={props.value.max || ""} onChange={setMax} />
            </Input.Group>

            <Input.Group>
                <Input.Label for="price">Price</Input.Label>
                <NumberInput id="price" value={props.value.price || ""} onChange={setPrice} />
            </Input.Group>
        </Card>
    )
}
