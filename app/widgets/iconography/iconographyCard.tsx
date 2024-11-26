import { View, Text, Image } from "react-native";
import { Iconography } from "./iconography";
import PressableOpacity from "@/components/pressableOpacity";
import { pink, pinkDark } from "@/utils/colors";

interface IconographyCardProps {
    iconography: Iconography
};

export const IconographyCard = ({ iconography }: IconographyCardProps) => {
    return (
        <PressableOpacity
            style={{
                width: "100%",
                height: 80,
                flexDirection: "row",
            }}
        // onPress={handlePress}
        >
            <View style={{
                flex: 1,
                backgroundColor: pink.pink5,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                gap: 10,
            }}>
                <Text style={{
                    flex: 1,
                    fontSize: 20,
                    fontWeight: "700",
                    color: pinkDark.pink7,
                }}
                >
                    {iconography.title}
                </Text>

                < Image
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 16
                    }}
                    source={iconography.images[0]}
                />
            </View>


        </PressableOpacity>
    );
};