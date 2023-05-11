import type { Object } from "ts-toolbelt"

import type { InputProps } from "./Input"
import Input from "./Input"

export type NumberInputProps = Object.Patch<
    | {
          onChange?: (value: number) => void
          nullable?: false
      }
    | {
          onChange?: (value: number | null) => void
          nullable: true
      },
    Omit<InputProps, "type">
>

export default function NumberInput(props: NumberInputProps) {
    const handleChange = (value: string) => {
        if (!value && props.nullable) {
            props.onChange?.(null)
        } else {
            props.onChange?.(Number(value || 0))
        }
    }

    return <Input {...props} type="text" onChange={handleChange} />
}
