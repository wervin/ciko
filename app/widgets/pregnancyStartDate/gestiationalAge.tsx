import { pink, pinkDark } from "@/utils/colors";
import { View, Text } from "react-native";

interface GestiationalAgeProps {
    gestationalAge: number;
};

export const GestiationalAge = ({
    gestationalAge
}: GestiationalAgeProps) => {
    return (
        <View
            style={{
                gap: 10,
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Age Gestationnel
            </Text>

            <View
                style={{
                    height: 60,
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        flex: 2,
                        backgroundColor: pink.pink4,
                        borderColor: pink.pink7,
                        borderWidth: 2,
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        textAlign: "center",
                        textAlignVertical: "center",
                        color: pinkDark.pink3,
                        fontSize: 20,
                        fontWeight: "700"
                    }}
                >
                    {Math.trunc(gestationalAge / 7)}
                </Text>

                <Text
                    style={{
                        backgroundColor: pink.pink7,
                        width: 60,
                        textAlign: "center",
                        textAlignVertical: "center",
                        color: pinkDark.pink7,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                >
                    SA
                </Text>

                <Text
                    style={{
                        flex: 1,
                        backgroundColor: pink.pink4,
                        borderColor: pink.pink7,
                        borderTopWidth: 2,
                        borderBottomWidth: 2,
                        textAlign: "center",
                        textAlignVertical: "center",
                        color: pinkDark.pink3,
                        fontSize: 20,
                        fontWeight: "700"
                    }}
                >
                    {gestationalAge % 7}
                </Text>

                <Text
                    style={{
                        backgroundColor: pink.pink7,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        width: 60,
                        textAlign: "center",
                        textAlignVertical: "center",
                        color: pinkDark.pink7,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                >
                    J
                </Text>
            </View>
        </View>
    );
}