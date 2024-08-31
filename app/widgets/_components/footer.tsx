import { View } from "react-native";
import { pink } from "@/utils/colors";
import { Shadow } from "react-native-shadow-2";

export const Footer = () => {
    return (
        <Shadow
            distance={6}
            style={{
                width: "100%"
            }}
            sides={{ top: true, bottom: false, start: true, end: false }}
            corners={{ topStart: true, topEnd: true, bottomStart: false, bottomEnd: false }}
        >
            <View
                style={{
                    width: "100%",
                    height: 80,
                    backgroundColor: pink.pink5,
                }}
            >
            </View>
        </Shadow>
    );
};