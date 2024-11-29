import { pink, pinkDark } from "@/utils/colors";
import { View, Text, TextInput } from "react-native";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { BodyMassIndexWidgetProps } from "../_widgets";

export const WeightInput = () => {
    const widgetData = useWidgetStoreContext<BodyMassIndexWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: BodyMassIndexWidgetProps) => void>((store) => store.setWidgetData);

    const onChangeWeight = (text: string) => {
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "") {
            setWidgetData({
                ...widgetData,
                weight: undefined,
            });
        }
        if (re.test(text)) {
            const w = parseFloat(text);
            setWidgetData({
                ...widgetData,
                weight: w,
            });
        }
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
                Poids
            </Text>

            <View style={{
                flexDirection: "row",
                height: 60,
                width: "100%",
                alignItems: "center",
            }}
            >
                <TextInput
                    onChangeText={onChangeWeight}
                    keyboardType='number-pad'
                    placeholder="Saisir le poids"
                    placeholderTextColor={pink.pink6}
                    style={{
                        flex: 1,
                        backgroundColor: pink.pink4,
                        paddingHorizontal: 20,
                        borderColor: pink.pink6,
                        borderWidth: 2,
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        height: 60,
                        color: pinkDark.pink3,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                    maxLength={5}
                    cursorColor={pink.pink7}
                    selectionColor={pink.pink7}
                >

                </TextInput>

                <View style={{
                    backgroundColor: pink.pink6,
                    height: 60,
                    width: 60,
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontWeight: "700",
                        fontSize: 22,
                        color: pinkDark.pink7
                    }}>
                        kg
                    </Text>
                </View>

            </View>
        </View>
    );
};