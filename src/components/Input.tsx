import { type JSXElement, Show } from "solid-js"

export type InputProps = {
    type: "text" | "email" | "password" | "textarea"
    id?: string
    value?: string | number | null
    onChange?: (value: string) => void
    placeholder?: string
    class?: string
    disabled?: boolean
}

function Input(props: InputProps) {
    const value = () => String(props.value ?? "")

    const handleChange = (e: Event & { currentTarget: { value: string } }) => {
        props.onChange?.(e.currentTarget.value)
    }

    return (
        <Show
            when={props.type === "textarea"}
            fallback={<input {...props} value={value()} onChange={handleChange} />}
        >
            <textarea {...props} value={value()} onChange={handleChange} />
        </Show>
    )
}

export type InputLabelProps = {
    for?: string
    class?: string
    children?: JSXElement
}

function InputLabel(props: InputLabelProps) {
    return <label {...props}>{props.children}</label>
}

export type InputGroupProps = {
    class?: string
    children?: JSXElement
}

function InputGroup(props: InputGroupProps) {
    return <fieldset class={props.class}>{props.children}</fieldset>
}

Input.Label = InputLabel
Input.Group = InputGroup

export default Input
