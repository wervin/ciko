import { purple, purpleDark } from "@/utils/colors";
import { useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";

interface GestiationalAgeProps {
    crownRumpLength: string
    gestationalAge: (crl: string) => number;
};

export const GestiationalAge = ({
    crownRumpLength,
    gestationalAge
}: GestiationalAgeProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: crownRumpLength ? 1 : 0, // Fade in if crownRumpLength is true, else fade out
                duration: 150, // Duration in milliseconds
                useNativeDriver: true, // Use native driver for better performance
            }
        ).start();
    }, [crownRumpLength]);

    return (
        <Animated.View
            style={{
                gap: 10,
                opacity: fadeAnim
            }}
        >

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "800",
                    color: purpleDark.purple5,
                }}
            >
                Age Gestationnel
            </Text>

            <View
                style={{
                    position: "relative"
                }}
            >
                <View
                    style={{
                        backgroundColor: purple.purple2,
                        borderColor: purple.purple6,
                        borderWidth: 2,
                        borderRadius: 10,
                        height: 60,
                    }}
                />

                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "40%",
                        height: 60,
                        paddingRight: 15,
                        color: purpleDark.purple7,
                        fontSize: 22,
                        fontWeight: "700",
                        textAlignVertical: "center",
                        textAlign: "right",
                    }}
                >
                    {crownRumpLength && Math.trunc(gestationalAge(crownRumpLength) / 7)}
                </Text>

                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "45%",
                        height: 60,
                        width: "15%",
                        backgroundColor: purple.purple5,
                        borderColor: purple.purple6,
                        borderWidth: 2,
                        color: purpleDark.purple7,
                        fontSize: 22,
                        fontWeight: "700",
                        textAlignVertical: "center",
                        textAlign: "center",
                    }}
                >
                    SA
                </Text>

                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "15%",
                        height: 60,
                        width: "30%",
                        paddingRight: 15,
                        color: purpleDark.purple7,
                        fontSize: 22,
                        fontWeight: "700",
                        textAlignVertical: "center",
                        textAlign: "right",
                    }}
                >
                    {crownRumpLength && gestationalAge(crownRumpLength) % 7}
                </Text>

                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: 60,
                        width: "15%",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: purple.purple5,
                        borderColor: purple.purple6,
                        borderWidth: 2,
                        color: purpleDark.purple7,
                        fontSize: 22,
                        fontWeight: "700",
                        textAlignVertical: "center",
                        textAlign: "center",
                    }}
                >
                    J
                </Text>
            </View>
        </Animated.View>
    );
}