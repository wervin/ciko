import { pink, pinkDark, red, redDark } from "@/utils/colors";
import { View, Text, TextInput } from "react-native";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { CrownRumpLengthWidgetProps } from "@/app/widgets/_components/widgets/crownRumpLengthWidget";
import { CircleAlert } from 'lucide-react-native';


export const GestationalAgeCurves = {
    Intergrowth: 1,
    Robinson: 2
};

export type GestationalAgeCurveType = typeof GestationalAgeCurves[keyof typeof GestationalAgeCurves];

export const CrownRumpLengthInput = () => {
    const widgetData = useWidgetStoreContext<CrownRumpLengthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    const onChangeCrownRumpLength = (text: string) => {
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "")
            setWidgetData({ ...widgetData, crownRumpLength: undefined })
        if (re.test(text))
            setWidgetData({ ...widgetData, crownRumpLength: parseFloat(text) })
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
                Longueur Cranio-Caudale
            </Text>

            <View style={{
                flexDirection: "row",
                height: 60,
                width: "100%",
                alignItems: "center",
            }}
            >
                <TextInput
                    value={widgetData?.crownRumpLength?.toString() ?? ""}
                    onChangeText={onChangeCrownRumpLength}
                    keyboardType='numeric'
                    style={{
                        flex: 1,
                        textAlign: "center",
                        backgroundColor: pink.pink4,
                        paddingHorizontal: 20,
                        borderColor: widgetData?.isValid ? pink.pink7 : red.red9,
                        borderWidth: 2,
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        height: 60,
                        color: pinkDark.pink3,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                    maxLength={5}
                    cursorColor={widgetData?.isValid ? pink.pink7 : red.red9}
                    selectionColor={widgetData?.isValid ? pink.pink7 : red.red9}
                >

                </TextInput>

                <View style={{
                    backgroundColor: widgetData?.isValid ? pink.pink7 : red.red9,
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
                        color: widgetData?.isValid ? pinkDark.pink7 : pink.pink4
                    }}>
                        mm
                    </Text>
                </View>

            </View>

            {
                !widgetData?.isValid &&

                <View style={{
                    flexDirection: "row",
                    height: 60,
                    width: "100%",
                    alignItems: "center",
                }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: red.red9,
                            paddingHorizontal: 20,
                            borderColor: red.red9,
                            borderWidth: 2,
                            borderTopLeftRadius: 16,
                            borderBottomLeftRadius: 16,
                            height: 60,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            fontWeight: "700",
                            fontSize: 16,
                            color: pink.pink4
                        }}>
                            La longueur cranio-caudale doit être comprise entre 15 et 95 mm
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: red.red9,
                        height: 60,
                        width: 60,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CircleAlert size={24} color={pink.pink4} />
                    </View>

                </View>
            }
        </View>
    );
};