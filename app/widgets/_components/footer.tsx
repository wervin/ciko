import { pink } from "@/utils/colors"
import { View } from "react-native"

export const Footer = () => {
    return (
        <View style={{
            width:"100%",
            height: 0,
            backgroundColor: pink.pink5,
            borderTopWidth: 1,
            borderTopColor: pink.pink6
        }} />
    )
}