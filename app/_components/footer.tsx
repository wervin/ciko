import { View, Text, Image } from "react-native";
import { pink, pinkDark } from "@/utils/colors";

export const Footer = () => {
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

                <View>

                </View>

            </View>
        </View>
    );
};