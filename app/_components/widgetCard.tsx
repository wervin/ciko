import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { pink, pinkA, pinkDark } from "@/utils/colors";
import { Widget } from "@/components/widgets";

export const WidgetCard = (widget: Widget) => {
    return (
        <Link
            style={{
                width: "100%",
                borderRadius: 10,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
            }}
            href={widget.page}
            asChild
        >
            <Pressable>
                <View
                    style={{
                        backgroundColor: pink.pink4,
                        flex: 1,
                        justifyContent: "space-around",
                        padding: 10,
                        gap: 10,
                        borderRadius: 10,
                        overflow: "hidden"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "800",
                            color: pinkDark.pink5,
                        }}
                    >
                        {widget.title}
                    </Text>


                    <View
                        style={{
                            flexDirection: "row",
                            gap: 5
                        }}
                    >
                        {
                            widget.categories.map((category) =>

                                <View
                                    key={category}
                                    style={{
                                        backgroundColor: pinkA.pinkA6,
                                        borderRadius: 10,
                                        padding: 5
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "500",
                                            color: pinkDark.pink5,
                                        }}
                                    >
                                        {category}
                                    </Text>
                                </View>
                            )
                        }

                    </View>
                </View>
            </Pressable>
        </Link>
    );
};