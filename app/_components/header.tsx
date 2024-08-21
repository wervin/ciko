import { View, Text, Image } from "react-native";
import { pink, pinkDark } from "@/utils/colors";

export const Header = () => {
    return (
        <View>
            <View
                style={{
                    position: "relative",
                    width: "100%",
                    height: 80,
                    backgroundColor: pink.pink5,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    elevation: 5,
                }}
            >

                <Image
                    style={{
                        position: "absolute",
                        top: "50%",
                        transform: [{ translateY: -32 }],
                        left: 20,
                        width: 64,
                        height: 64
                    }}
                    source={require("@/assets/images/logo.png")}
                />

                <Text
                    style={{
                        position: "absolute",
                        top: "50%",
                        transform: [{ translateY: -32 }],
                        left: 86,
                        fontSize: 60,
                        fontFamily: "Righteous",
                        fontWeight: "600",
                        color: pinkDark.pink3
                    }}
                >
                    ciko
                </Text>

            </View>
        </View>
    );
};