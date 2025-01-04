import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { pink, pinkDark } from "@/utils/colors";
import { View, Text } from "react-native";
import { NewbornWeightWidgetProps } from "../_widgets";
import PressableOpacity from "@/components/pressableOpacity";
import { Check } from "lucide-react-native";

export const Sex = {
    Male: 1,
    Female: 2
};

export type SexType = typeof Sex[keyof typeof Sex];

export const SexInput = () => {
    const widgetData = useWidgetStoreContext<NewbornWeightWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: NewbornWeightWidgetProps) => void>((store) => store.setWidgetData);

    const sex = widgetData?.sex ?? Sex.Male;

    const onChangeReferenceTable = (sex: SexType) => {
        setWidgetData({
            ...widgetData,
            sex: sex,
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
                Sexe du nouveau-né
            </Text>

            <PressableOpacity
                style={{
                    backgroundColor: sex === Sex.Male ? pink.pink6 : pink.pink5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                }}

                onPress={() => onChangeReferenceTable(Sex.Male)}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: sex === Sex.Male ? "700" : "500",
                        color: pinkDark.pink7
                    }}
                >
                    Masculin
                </Text>

                {
                    sex === Sex.Male &&
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
                    backgroundColor: sex === Sex.Female ? pink.pink6 : pink.pink5,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10
                }}

                onPress={() => onChangeReferenceTable(Sex.Female)}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: sex === Sex.Female ? "700" : "500",
                        color: pinkDark.pink7
                    }}
                >
                    Féminin
                </Text>

                {
                    sex === Sex.Female &&
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