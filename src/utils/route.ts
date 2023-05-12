import type { APIRoute, AstroCookies, Params } from "astro"

import { SessionService } from "@/services/SessionService"
import { NetworkError } from "@/utils/errors"

type RouteFn = {
    (handler: (request: RouteInput) => Promise<RouteOutput>): APIRoute
    auth: (handler: (request: RouteInput) => Promise<RouteOutput>) => APIRoute
}

export type RouteInput = {
    body: unknown
    query: Record<string, string | undefined>
    session: SessionService
    headers: Headers
    method: string
    params: Params
    cookies: AstroCookies
    request: Request
}

export type RouteOutput =
    | {
          status?: number
          headers?: Record<string, string>
          body?: { success: boolean; [key: string]: unknown }
      }
    | {
          redirect: string
          status?: 301 | 302 | 303 | 307 | 308
      }

export const route: RouteFn = (handler) => {
    return async ({ request, params, cookies, redirect }) => {
        let body: unknown = undefined

        if (request.headers.get("content-type")?.startsWith("application/json")) {
            body = await request.json()
        }

        const session = await SessionService.fromCookies(cookies)

        const response = await handler({
            body,
            session,
            headers: request.headers,
            method: request.method,
            query: Object.fromEntries(new URLSearchParams(new URL(request.url).search).entries()),
            params,
            cookies,
            request,
        }).catch((error): RouteOutput => {
            if (error instanceof NetworkError) {
                return error.toOutput()
            }

            console.error(error)

            const output = {
                status: 500,
                body: {
                    success: false,
                    error: "An internal server error occurred.",
                    stack: undefined as string | undefined,
                },
            }

            if (import.meta.env.DEV) {
                output.body.error = error instanceof Error ? error.message : String(error)
                output.body.stack = error instanceof Error ? error.stack : undefined
            }

            return output
        })

        if ("redirect" in response) {
            return redirect(response.redirect, response.status)
        }

        let responseBody: string | null = null

        if (
            typeof response.body === "string" ||
            typeof response.body === "number" ||
            typeof response.body === "boolean" ||
            response.body instanceof Date
        ) {
            responseBody = response.body.toString()
        } else if (typeof response.body === "object") {
            responseBody = JSON.stringify(response.body)
        }

        return new Response(responseBody, {
            status: response.status,
            headers: response.headers,
        })
    }
}

route.auth = (handler) => {
    return route(async (request) => {
        if (!request.session.current) {
            return { status: 401 }
        }

        return handler(request)
    })
}
