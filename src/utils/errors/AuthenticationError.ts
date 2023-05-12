import { NetworkError } from "./NetworkError";

/**
 * Represents an error that occurs when a user is not authenticated.
 */
export class AuthenticationError extends NetworkError {
    constructor(message = "You are not authenticated.") {
        super(401, message)
        this.name = "AuthenticationError"
    }
}
