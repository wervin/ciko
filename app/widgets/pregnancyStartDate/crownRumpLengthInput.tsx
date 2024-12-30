import { pink, pinkDark } from "@/utils/colors";
import { View, Text, TextInput, Platform } from "react-native";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { PregnancyStartDateWidgetProps } from "../_widgets";

export const CrownRumpLengthInput = () => {
    const widgetData = useWidgetStoreContext<PregnancyStartDateWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: PregnancyStartDateWidgetProps) => void>((store) => store.setWidgetData);

    const onChangeCrownRumpLength = (text: string) => {
        const replacedText = text.replace(',', '.');
        const re = /^(\d+(\.\d+)?|\.\d+)$/;
        if (replacedText === "") {
            setWidgetData({
                ...widgetData,
                isPresent: false,
                isValid: true,
                crownRumpLength: undefined,
            });
        }
        if (re.test(replacedText)) {
            const crl = parseFloat(replacedText);
            const valid = !(crl < 15 || 95 < crl);
            setWidgetData({
                ...widgetData,
                isPresent: true,
                isValid: valid,
                crownRumpLength: crl,
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
                Longueur Cranio-Caudale
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
                    onChangeText={onChangeCrownRumpLength}
                    keyboardType={Platform.OS === 'ios' ? 'decimal-pad' : 'number-pad'}
                    placeholder="Saisir une longueur"
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
                />

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
                        mm
                    </Text>
                </View>

            </View>
        </View>
    );
};