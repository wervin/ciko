import { View, Text } from "react-native"
import { Iconography } from "./iconography";
import { IconographyCard } from "./iconographyCard";
import { pink, pinkDark } from "@/utils/colors";
import { useState } from "react";
import PressableOpacity from "@/components/pressableOpacity";
import { ChevronDown, ChevronUp, Expand, Minimize } from "lucide-react-native";

interface TrimesterCardProps {
    title: string,
    iconographyList: Iconography[];
};

export const TrimesterCard = ({ title, iconographyList }: TrimesterCardProps) => {
    const [visible, setVisible] = useState(false);

    return (
        <View
            style={{
                gap: 10,
                padding: 10,
                backgroundColor: pink.pink4,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: pink.pink6
            }}
        >
            <PressableOpacity
                style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 10
                }}
                onPress={() => setVisible(!visible)}
            >

                <Text style={{
                    flex: 1,
                    fontSize: 24,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}>
                    {title}
                </Text>

                <View
                    style={{
                        width: 30,
                        height: 30,
                        backgroundColor: pink.pink7,
                        borderRadius: 30,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {
                        visible ?
                            <ChevronUp
                                width={20}
                                height={20}
                                color={pinkDark.pink7}
                            />
                            :
                            <ChevronDown
                                width={20}
                                height={20}
                                color={pinkDark.pink7}
                            />
                    }
                </View>
            </PressableOpacity>

            {
                visible && iconographyList.map((iconography, index) =>
                    <IconographyCard key={index} iconography={iconography} />
                )
            }
        </View>
    );
};