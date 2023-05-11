import { useActions } from "solid-sm"

import Card from "@/components/Card"
import Input from "@/components/Input"
import NumberInput from "@/components/NumberInput"

import type { EditingMenuSectionState } from "../state"
import MenuEntryFormList from "./MenuEntryFormList"

type Props = {
    value: EditingMenuSectionState
}

export default function MenuSectionForm(props: Props) {
    const [addEntry, setDescription, setMax, setMin, setTitle] = useActions(
        () => props.value,
        "addEntry",
        "setDescription",
        "setMax",
        "setMin",
        "setTitle",
    )

    const handleAddEntry = (type: "section" | "item") => {
        addEntry(type)
    }

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
                <NumberInput id="min" value={props.value.min || ""} onChange={setMin} />
            </Input.Group>

            <Input.Group>
                <Input.Label for="max">Máximo</Input.Label>
                <NumberInput id="max" value={props.value.max || ""} onChange={setMax} />
            </Input.Group>

            <MenuEntryFormList entries={props.value.entries} onAddEntry={handleAddEntry} />
        </Card>
    )
}
