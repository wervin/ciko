import { pink, pinkDark } from "@/utils/colors";
import { View, Text, TextInput } from "react-native";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { BodyMassIndexWidgetProps } from "../_widgets";

export const SizeInput = () => {
    const widgetData = useWidgetStoreContext<BodyMassIndexWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: BodyMassIndexWidgetProps) => void>((store) => store.setWidgetData);

    const onChangeSize = (text: string) => {
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "") {
            setWidgetData({
                ...widgetData,
                size: undefined,
            });
        }
        if (re.test(text)) {
            const s = parseFloat(text);
            setWidgetData({
                ...widgetData,
                size: s,
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
                    fontSize: 22,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Taille
            </Text>

            <View style={{
                flexDirection: "row",
                height: 50,
                width: "100%",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: 16,
                borderWidth: 2,
                borderColor: pink.pink6,
                backgroundColor: pink.pink6
            }}
            >
                <TextInput
                    textAlignVertical="center"
                    onChangeText={onChangeSize}
                    keyboardType='number-pad'
                    placeholder="Saisir la taille"
                    placeholderTextColor={pink.pink6}
                    style={{
                        flex: 1,
                        backgroundColor: pink.pink4,
                        paddingHorizontal: 20,
                        height: 50,
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
                    height: 50,
                    width: 50,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Text style={{
                        fontWeight: "700",
                        fontSize: 18,
                        color: pinkDark.pink7
                    }}>
                        cm
                    </Text>
                </View>

            </View>
        </View>
    );
};