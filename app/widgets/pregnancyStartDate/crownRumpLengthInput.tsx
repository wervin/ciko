import { blackA, gray, pink, pinkDark, red, redDark } from "@/utils/colors";
import { View, Text, TextInput, Pressable, Platform } from "react-native";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { CircleAlert } from 'lucide-react-native';
import { PregnancyStartDateWidgetProps } from "../_widgets";
import { useState } from "react";


export const GestationalAgeCurves = {
    Intergrowth: 1,
    Robinson: 2
};

export type GestationalAgeCurveType = typeof GestationalAgeCurves[keyof typeof GestationalAgeCurves];

export const CrownRumpLengthInput = () => {
    const [crownRumpLength, setCrownRumpLength] = useState<number | undefined>();
    const [gestationalAgeCurve, setGestationalAgeCurve] = useState(GestationalAgeCurves.Intergrowth);
    const widgetData = useWidgetStoreContext<PregnancyStartDateWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: PregnancyStartDateWidgetProps) => void>((store) => store.setWidgetData);

    const robinson = (crl: number) => {
        return Math.round(8.052 * Math.sqrt(crl * 1.037) + 23.73);
    }

    const intergrowth = (crl: number) => {
        return Math.round(40.9041 + 3.21585 * Math.sqrt(crl) + 0.348956 * crl)
    }

    const gestationalAge = (crl: number, curve: GestationalAgeCurveType) => {
        return curve === GestationalAgeCurves.Robinson ? robinson(crl) : intergrowth(crl)
    };

    const onChangeCrownRumpLength = (text: string) => {
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "") {
            setCrownRumpLength(undefined);
            setWidgetData({ ...widgetData, isPresent: false, isValid: true, gestationalAge: undefined });
        }
        if (re.test(text)) {
            const crl = parseFloat(text);
            const valid = !(crl < 15 || 95 < crl);
            setCrownRumpLength(crl);
            setWidgetData({
                ...widgetData,
                isPresent: true,
                isValid: valid,
                gestationalAge: valid ? gestationalAge(crl, gestationalAgeCurve) : undefined
            });
        }
    };

    const onChangeGestationalAgeCurve = (curve: GestationalAgeCurveType) => {
        setGestationalAgeCurve(curve);
        if (crownRumpLength) {
            setWidgetData({ ...widgetData, gestationalAge: gestationalAge(crownRumpLength, curve) });
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
                    value={crownRumpLength?.toString() ?? ""}
                    onChangeText={onChangeCrownRumpLength}
                    keyboardType='numeric'
                    textAlign="center"
                    multiline={Platform.OS === "ios" ? false : true}
                    style={{
                        flex: 1,
                        backgroundColor: pink.pink4,
                        paddingHorizontal: 20,
                        borderColor: pink.pink7,
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
                    backgroundColor: pink.pink7,
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
                        mm
                    </Text>
                </View>

            </View>

            <Pressable
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5
                }}
                onPress={() => onChangeGestationalAgeCurve(GestationalAgeCurves.Intergrowth)}
            >
                <View
                    style={{
                        width: 26,
                        height: 26,
                        borderWidth: 2,
                        borderRadius: 26,
                        borderColor: pink.pink6,
                        backgroundColor: pink.pink2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {
                        gestationalAgeCurve === GestationalAgeCurves.Intergrowth &&
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                backgroundColor: pink.pink7,
                                borderRadius: 14
                            }}
                        />
                    }
                </View>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: pinkDark.pink3,
                    }}
                >
                    INTERGROWTH-21st
                </Text>
            </Pressable>

            <Pressable
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5
                }}

                onPress={() => onChangeGestationalAgeCurve(GestationalAgeCurves.Robinson)}
            >
                <View
                    style={{
                        width: 26,
                        height: 26,
                        borderWidth: 2,
                        borderRadius: 26,
                        borderColor: pink.pink6,
                        backgroundColor: pink.pink2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}

                >
                    {
                        gestationalAgeCurve === GestationalAgeCurves.Robinson &&
                        <View
                            style={{
                                width: 14,
                                height: 14,
                                backgroundColor: pink.pink7,
                                borderRadius: 14
                            }}
                        />
                    }
                </View>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "600",
                        color: pinkDark.pink3,
                    }}
                >
                    Robinson
                </Text>
            </Pressable>
        </View>
    );
};