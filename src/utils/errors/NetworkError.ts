import type { RouteOutput } from "@/utils/route"

/**
 * Represents an error that occurred while handling a request.
 */
export abstract class NetworkError extends Error {
    constructor(readonly status: number, message: string) {
        super(message)
        this.name = "NetworkError"
    }

    toOutput(): RouteOutput {
        return {
            status: this.status,
            body: { ...this.getExtensions(), success: false, error: this.message },
        }
    }

    getExtensions(): Record<string, unknown> {
        return {}
    }
}
