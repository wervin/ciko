import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { blackA, gray, grayA, pink, pinkA, pinkDark, pinkDarkA, whiteA } from "@/utils/colors";
import { View, Text, Pressable } from "react-native";
import { PregnancyStartDateWidgetProps } from "../_widgets";
import { GestationalAgeCurveType, GestationalAgeCurves } from "./gestationalAgeCurve";
import PressableOpacity from "@/components/pressableOpacity";
import { Check } from "lucide-react-native";

export const GestationalAgeCurveInput = () => {
    const widgetData = useWidgetStoreContext<PregnancyStartDateWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: PregnancyStartDateWidgetProps) => void>((store) => store.setWidgetData);

    const gestationalAgeCurve = widgetData?.gestationalAgeCurve ?? GestationalAgeCurves.Intergrowth;

    const onChangeGestationalAgeCurve = (curve: GestationalAgeCurveType) => {
        setWidgetData({
            ...widgetData,
            gestationalAgeCurve: curve,
        });
    };

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
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Référentiel
            </Text>

            <PressableOpacity
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: gestationalAgeCurve === GestationalAgeCurves.Intergrowth ? pink.pink6 : pink.pink5,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                }}

                onPress={() => onChangeGestationalAgeCurve(GestationalAgeCurves.Intergrowth)}
            >
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: gestationalAgeCurve === GestationalAgeCurves.Intergrowth ? "700" : "500",
                        color: pinkDark.pink7,
                    }}>
                        INTERGROWTH-21
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        lineHeight: 20,
                        marginLeft: -1,
                        color: pinkDark.pink7,
                        fontWeight: gestationalAgeCurve === GestationalAgeCurves.Intergrowth ? "700" : "500",
                        textAlignVertical: 'top',
                    }}>
                        st
                    </Text>
                </View>
                {
                    gestationalAgeCurve === GestationalAgeCurves.Intergrowth &&
                    <View
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: 22,
                            backgroundColor: pinkDark.pink7,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Check size={20} color={pink.pink6} />
                    </View>
                }
            </PressableOpacity>

            <PressableOpacity
                style={{
                    backgroundColor: gestationalAgeCurve === GestationalAgeCurves.Robinson ? pink.pink6 : pink.pink5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                }}

                onPress={() => onChangeGestationalAgeCurve(GestationalAgeCurves.Robinson)}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: gestationalAgeCurve === GestationalAgeCurves.Robinson ? "700" : "500",
                        color: pinkDark.pink7
                    }}
                >
                    Robinson
                </Text>
                {
                    gestationalAgeCurve === GestationalAgeCurves.Robinson &&
                    <View
                        style={{
                            width: 22,
                            height: 22,
                            borderRadius: 22,
                            backgroundColor: pinkDark.pink7,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Check size={20} color={pink.pink6} />
                    </View>
                }
            </PressableOpacity>
        </View>
    );
};