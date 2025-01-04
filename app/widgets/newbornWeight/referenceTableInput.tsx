import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { pink, pinkDark } from "@/utils/colors";
import { View, Text } from "react-native";
import { NewbornWeightWidgetProps } from "../_widgets";
import { ReferenceTableType, ReferenceTables } from "./referenceTables";
import PressableOpacity from "@/components/pressableOpacity";
import { Check } from "lucide-react-native";

export const ReferenceTableInput = () => {
    const widgetData = useWidgetStoreContext<NewbornWeightWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: NewbornWeightWidgetProps) => void>((store) => store.setWidgetData);

    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Audipog;

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
        </View>
    );
};