import { View, Text, Image } from "react-native";
import { Iconography } from "./iconography";
import PressableOpacity from "@/components/pressableOpacity";
import { pink, pinkDark } from "@/utils/colors";
import { IconographyWidgetProps } from "../_widgets/iconographyWidget";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";

interface IconographyCardProps {
    iconography: Iconography
};

export const IconographyCard = ({ iconography }: IconographyCardProps) => {
    const widgetData = useWidgetStoreContext<IconographyWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    return (
        <PressableOpacity
            style={{ borderRadius: 16, overflow: "hidden", backgroundColor: pink.pink5, padding: 10, gap: 10 }}
            onPress={() => setWidgetData({ ...widgetData, iconography: iconography })}
        >
            <View
                style={{
                    width: "100%",
                    height: 60,
                    flexDirection: "row",
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: pink.pink5,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
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
            </View>


            {
                iconography.alternatives.map((alternative, index) => (
                    <PressableOpacity
                        key={index}
                        style={{
                            width: "100%",
                            height: 60,
                            flexDirection: "row",
                            borderRadius: 16,
                        }}
                        onPress={() => setWidgetData({ ...widgetData, iconography: alternative })}
                    >
                        <View style={{
                            flex: 1,
                            backgroundColor: pink.pink6,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 5,
                            borderRadius: 16,
                            gap: 5,
                        }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "700",
                                    color: pinkDark.pink7,
                                }}
                                >
                                    {alternative.title}
                                </Text>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: "500",
                                    color: pinkDark.pink6,
                                }}
                                >
                                    Coupe Complémentaire
                                </Text>
                            </View>

                            < Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 16
                                }}
                                source={alternative.images[0]}
                            />
                        </View>
                    </PressableOpacity>
                ))
            }
        </PressableOpacity>
    );
};