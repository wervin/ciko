import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { blackA, gray, pink, pinkA, pinkDark, pinkDarkA, slate, whiteA, yellowDark } from "@/utils/colors";
import { View, Text, Pressable } from "react-native";
import { NewbornWeightWidgetProps } from "../_widgets";
import { ReferenceTableType, ReferenceTables } from "./referenceTables";
import PressableOpacity from "@/components/pressableOpacity";
import { Check, CircleAlert, TriangleAlert } from "lucide-react-native";

export const ReferenceTableInput = () => {
    const widgetData = useWidgetStoreContext<NewbornWeightWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: NewbornWeightWidgetProps) => void>((store) => store.setWidgetData);

    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;

    const onChangeReferenceTable = (curve: ReferenceTableType) => {
        setWidgetData({
            ...widgetData,
            referenceTable: curve,
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
                    fontSize: 22,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Référentiel
            </Text>

            <PressableOpacity
                style={{
                    backgroundColor: referenceTable === ReferenceTables.Intergrowth ? pink.pink6 : pink.pink5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                }}

                onPress={() => onChangeReferenceTable(ReferenceTables.Intergrowth)}
            >
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        fontWeight: referenceTable === ReferenceTables.Intergrowth ? "700" : "500",
                        color: pinkDark.pink7,
                    }}>
                        INTERGROWTH-21
                    </Text>
                    <Text style={{
                        fontSize: 12,
                        lineHeight: 20,
                        marginLeft: -1,
                        color: pinkDark.pink7,
                        fontWeight: referenceTable === ReferenceTables.Intergrowth ? "700" : "500",
                        textAlignVertical: 'top',
                    }}>
                        st
                    </Text>
                </View>

                {
                    referenceTable === ReferenceTables.Intergrowth &&
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
                disabled={true}
                style={{
                    backgroundColor: referenceTable === ReferenceTables.Audipog ? pink.pink6 : pink.pink5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                }}

                onPress={() => onChangeReferenceTable(ReferenceTables.Audipog)}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: referenceTable === ReferenceTables.Audipog ? "700" : "500",
                        color: pinkDark.pink7
                    }}
                >
                    AUDIPOG
                </Text>

                {
                    referenceTable === ReferenceTables.Audipog &&
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

            {
                <View style={{
                    flexDirection: "row",
                    height: 50,
                    width: "100%",
                    alignItems: "center",
                }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: yellowDark.yellow11,
                            paddingHorizontal: 20,
                            borderColor: yellowDark.yellow11,
                            borderWidth: 2,
                            borderTopLeftRadius: 16,
                            borderBottomLeftRadius: 16,
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            fontWeight: "700",
                            fontSize: 15,
                            color: whiteA.whiteA12
                        }}>
                            AUDIPOG n'est pas disponible pour le moment
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: yellowDark.yellow11,
                        height: 50,
                        width: 50,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <TriangleAlert size={24} color={whiteA.whiteA12} />
                    </View>

                </View>
            }
        </View>
    );
};