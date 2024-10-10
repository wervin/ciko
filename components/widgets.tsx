import { StaticRoutes } from "expo-router"
import { ReactNode } from "react"

export type Widget = {
    id: string,
    title: string,
    subtitle: string,
    description: () => ReactNode,
    footer?: () => ReactNode,
    page: StaticRoutes,
};