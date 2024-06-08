import { pink, pinkDark } from "@/utils/colors";
import { useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { CalendarDays } from 'lucide-react-native';

interface TermProps {
    crownRumpLength: string
    termDate: (crl: string) => string;
};

export const Term = ({
    crownRumpLength,
    termDate
}: TermProps) => {
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
                    color: pinkDark.pink5,
                }}
            >
                Terme
            </Text>

            <View
                style={{
                    position: "relative"
                }}
            >
                <View
                    style={{
                        backgroundColor: pink.pink2,
                        borderColor: pink.pink6,
                        borderWidth: 2,
                        borderRadius: 10,
                        height: 60,
                    }}
                />

                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "15%",
                        width: "85%",
                        height: 60,
                        paddingRight: 15,
                        color: pinkDark.pink7,
                        fontSize: 22,
                        fontWeight: "700",
                        textAlignVertical: "center",
                        textAlign: "right",
                    }}
                >
                    {crownRumpLength && termDate(crownRumpLength)}
                </Text>

                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: 60,
                        width: "15%",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: pink.pink5,
                        borderColor: pink.pink6,
                        borderWidth: 2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <CalendarDays
                        color={pinkDark.pink7}
                        size={24}
                    />
                </View>

            </View>

        </Animated.View>
    );
};