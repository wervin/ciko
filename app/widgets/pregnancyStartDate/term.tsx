import { pink, pinkDark, purple, purpleDark } from "@/utils/colors";
import { useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { CalendarHeart } from 'lucide-react-native';

interface TermProps {
    termDate: Date;
};

export const Term = ({
    termDate
}: TermProps) => {

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
                Terme
            </Text>

            <View
                style={{
                    height: 60,
                    borderRadius: 16,
                    flexDirection: "row",
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: pink.pink5,
                    borderColor: pink.pink5,
                    borderWidth: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                }}
                >
                    <Text
                        style={{
                            color: pinkDark.pink3,
                            fontSize: 22,
                            fontWeight: "700"
                        }}
                    >
                        {termDate.toLocaleDateString()}
                    </Text>
                </View>

                <View style={{
                    backgroundColor: pink.pink6,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    width: 60
                }}
                >
                    <CalendarHeart
                        color={pinkDark.pink7}
                        size={24}
                    />
                </View>
            </View>

        </View>
    );
};