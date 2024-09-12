import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { pink, pinkDark } from "@/utils/colors";
import { Rocket } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Pressable, Modal } from "react-native"

export const ExecuteButton = () => {
    const widgetInfo = useWidgetStoreContext((store) => store.widgetInfo);

    return (
        <Pressable
            style={{
                bottom: 10,
                right: 10,
                position: "absolute",
                borderRadius: 16,
                padding: 10,
                backgroundColor: pink.pink7,
                borderWidth: 1,
                borderColor: pink.pink6,
                flexDirection: "row",
                alignItems: "center",
                gap: 10
            }}
        >
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
            }}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "700",
                        color: pinkDark.pink7
                    }}
                >
                    Calculer
                </Text>
            </View>

            <Rocket
                width={28}
                height={28}
                color={pinkDark.pink7}
            />
        </Pressable>
    );
};