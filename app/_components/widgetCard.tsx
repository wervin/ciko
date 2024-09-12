import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { Widget } from "@/components/widgets";

export const WidgetCard = (widget: Widget) => {
    return (
        <Link
            style={{
                width: "100%",
                borderRadius: 16,
            }}
            href={widget.page}
            asChild
        >
            <Pressable style={{
                height: 90,
                width: "100%",
                backgroundColor: pink.pink4,
                borderColor: pink.pink6,
                borderWidth: 1,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "space-around",
                gap: 10,
                padding: 10,
                flexDirection: "row",
            }}>
                <View style={{
                    backgroundColor: pink.pink7,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 60,
                    borderRadius: 16,
                    flexDirection: "row",
                }}
                >
                    <Text style={{
                        fontSize: 28,
                        fontWeight: "800",
                        color: pinkDark.pink7
                    }}
                    >
                        {widget.title}
                    </Text>
                </View>

                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: "700",
                        color: pinkDark.pink3
                    }}
                    >
                        {widget.subtitle}
                    </Text>
                </View>
            </Pressable>
        </Link>
    );
};