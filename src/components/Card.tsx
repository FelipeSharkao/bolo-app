import type { JSXElement } from "solid-js"

export type CardProps = {
    class?: string
    children: JSXElement
}

function Card(props: CardProps) {
    return <article class={(props.class)}>{props.children}</article>
}

export type CardHeaderProps = {
    class?: string
    children: JSXElement
}

function CardHeader(props: CardHeaderProps) {
    return <header class={props.class}>{props.children}</header>
}

export type CardFooterProps = {
    class?: string
    children: JSXElement
}

function CardFooter(props: CardFooterProps) {
    return <footer class={props.class}>{props.children}</footer>
}

Card.Header = CardHeader
Card.Footer = CardFooter

export default Card
