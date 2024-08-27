import { StaticRoutes } from "expo-router"

export type Widget = {
    id: string,
    categories: string[],
    title: string,
    page: StaticRoutes
}