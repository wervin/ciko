import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { Widget } from "@/components/widget";
import PressableOpacity from "@/components/pressableOpacity";

export const WidgetCard = (widget: Widget) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(widget.page);
    };

    return (
        <PressableOpacity
            style={{
                height: 70,
                width: "100%",
                flexDirection: "row",
            }}
            onPress={handlePress}
        >
            <View style={{
                flex: 1,
                backgroundColor: pink.pink5,
                borderColor: pink.pink6,
                borderWidth: 1,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                justifyContent: "center",
                paddingHorizontal: 10
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: pinkDark.pink7,
                }}
                >
                    {widget.title}
                </Text>
            </View>

            <View style={{
                backgroundColor: pink.pink6,
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                flexDirection: "row",
            }}
            >
                {widget.icon()}
            </View>
        </PressableOpacity>
    );
};