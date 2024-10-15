import { pink, pinkDark, red } from "@/utils/colors";
import { View, Text, TextInput } from "react-native";
import { CircleAlert } from "lucide-react-native";
import { FetalWeightWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";

export const HeadCircumferenceInput = () => {
    const widgetData = useWidgetStoreContext<FetalWeightWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(date: FetalWeightWidgetProps) => void>((store) => store.setWidgetData);

    const onChangeHeadCircumference = (text: string) => {
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "")
            setWidgetData({ ...widgetData, headCircumference: undefined })
        if (re.test(text))
            setWidgetData({ ...widgetData, headCircumference: parseFloat(text) })
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
                Périmètre Crânien
            </Text>

            <View style={{
                flexDirection: "row",
                height: 60,
                width: "100%",
                alignItems: "center",
            }}
            >
                <TextInput
                    value={widgetData?.headCircumference?.toString() ?? ""}
                    onChangeText={onChangeHeadCircumference}
                    keyboardType='numeric'
                    style={{
                        flex: 1,
                        textAlign: "center",
                        backgroundColor: pink.pink4,
                        paddingHorizontal: 20,
                        borderColor: widgetData?.isHeadCircumferenceValid ? pink.pink7 : red.red9,
                        borderWidth: 2,
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        height: 60,
                        color: pinkDark.pink3,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                    maxLength={5}
                    cursorColor={widgetData?.isHeadCircumferenceValid ? pink.pink7 : red.red9}
                    selectionColor={widgetData?.isHeadCircumferenceValid ? pink.pink7 : red.red9}
                >

                </TextInput>

                <View style={{
                    backgroundColor: widgetData?.isHeadCircumferenceValid ? pink.pink7 : red.red9,
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
                        color: widgetData?.isHeadCircumferenceValid ? pinkDark.pink7 : pink.pink4
                    }}>
                        mm
                    </Text>
                </View>

            </View>

            {
                !widgetData?.isHeadCircumferenceValid &&

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
                            Le périmètre crânien doit être renseigné
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