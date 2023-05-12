const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

/**
 * Base58 encoding and decoding. Creates small, URL-friendly strings from large numbers.
 */
export class Base58 {
    /**
     * Encodes a number into a Base58 string.
     *
     * @param value The number to encode.
     * @returns The encoded string.
     * @throws {Error} If the number is too large to encode or if the number is negative.
     */
    static encode(value: number): string {
        if (value < 0) {
            throw new Error("Cannot encode negative numbers")
        }

        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error("Cannot encode numbers larger than Number.MAX_SAFE_INTEGER")
        }

        let result = ""

        while (value > 0) {
            const remainder = value % 58
            value = Math.floor(value / 58)
            result = BASE58_ALPHABET[remainder] + result
        }

        return result
    }

    /**
     * Decodes a Base58 string into a number.
     *
     * @param value The string to decode.
     * @returns The decoded number.
     * @throws {Error} If the string contains invalid characters.
     */
    static decode(value: string): number {
        let result = 0

        for (let i = 0; i < value.length; i++) {
            const digit = BASE58_ALPHABET.indexOf(value[i])

            if (digit < 0) {
                throw new Error(`Invalid character ${JSON.stringify(value[i])} at position ${i}`)
            }

            result = result * 58 + digit
        }

        return result
    }
}
