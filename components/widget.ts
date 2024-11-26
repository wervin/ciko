import { Href } from "expo-router"
import { ReactNode } from "react"

export type Widget = {
    id: string,
    title: string,
    description: () => ReactNode,
    footer?: () => ReactNode,
    icon: () => ReactNode,
    page: Href,
};