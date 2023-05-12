import { type Accessor, createEffect, createSignal, onCleanup, untrack } from "solid-js"

/**
 * Create a solid signal that debounces the input signal.
 */
export function debounce<T>(input: Accessor<T>, delay: number): Accessor<T> {
    const [output, setOutput] = createSignal(untrack(input))

    createEffect(() => {
        const value = input()

        const timeout = setTimeout(() => {
            setOutput(() => value)
        }, delay)

        onCleanup(() => {
            clearTimeout(timeout)
        })
    })

    return output
}
