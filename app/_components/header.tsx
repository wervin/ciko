import { View, Text, Image } from "react-native";
import { pink, pinkDark } from "@/utils/colors";


export const Header = () => {
    return (
        <View
            style={{
                backgroundColor: pink.pink5,
                borderBottomColor: pink.pink6,
                borderBottomWidth: 1,
                width: "100%",
                height: 80,
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
                gap: 5
            }}
        >
            <Image
                style={{
                    width: 48,
                    height: 48,
                }}
                source={require("@/assets/images/logo.png")}
            />

            <Text
                style={{
                    fontSize: 48,
                    fontFamily: "Righteous",
                    color: pinkDark.pink7,
                    height: 49
                }}
            >
                ciko
            </Text>
        </View>
    );
};