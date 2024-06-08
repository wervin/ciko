import { pink, pinkDark, red, redDark } from "@/utils/colors";
import { View, Text, TextInput, Pressable } from "react-native";
import { CircleAlert } from "lucide-react-native";

export const GestationalAgeCurves = {
    Intergrowth: 1,
    Robinson: 2
};

interface CranioCaudaleInputProps {
    onChangeText: (text: string) => void;
    crownRumpLength: string;
    isCrownRumpLengthValid: boolean;
    setIsCrownRumpLengthValid: (valid: boolean) => void;
    isValid: boolean;
    setIsValid: (valid: boolean) => void;
    onPressGestationalAgeCurve: (gestationalAgeCurve: number) => void;
    gestationalAgeCurve: number;
};

export const CranioCaudaleInput = ({
    onChangeText,
    crownRumpLength,
    isCrownRumpLengthValid,
    isValid,
    setIsValid,
    setIsCrownRumpLengthValid,
    onPressGestationalAgeCurve,
    gestationalAgeCurve
}: CranioCaudaleInputProps) => {

    return (
        <View
            style={{
                gap: 10
            }}
        >

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "800",
                    color: pinkDark.pink5,
                }}
            >
                Longueur Cranio-Caudale
            </Text>

            <View
                style={{
                    position: "relative"
                }}
            >
                <TextInput
                    onChangeText={onChangeText}
                    onEndEditing={(e) => {
                        const crl = parseFloat(e.nativeEvent.text);
                        setIsValid(true);
                        setIsCrownRumpLengthValid(crl < 15 || 95 < crl ? false : true)
                    }}
                    keyboardType='numeric'
                    style={{
                        backgroundColor: isCrownRumpLengthValid || !isValid ? pink.pink2 : red.red4,
                        paddingHorizontal: 20,
                        borderColor: isCrownRumpLengthValid || !isValid ? pink.pink6 : redDark.red8,
                        borderWidth: 2,
                        borderRadius: 10,
                        height: 60,
                        color: isCrownRumpLengthValid || !isValid ? pinkDark.pink7 : redDark.red8,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                    maxLength={5}
                    cursorColor={isCrownRumpLengthValid || !isValid ? pink.pink7 : redDark.red8}
                    selectionColor={isCrownRumpLengthValid || !isValid ? pink.pink7 : redDark.red8}
                    value={crownRumpLength}
                />
                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "15%",
                        backgroundColor: isCrownRumpLengthValid || !isValid ? pink.pink5 : red.red7,
                        borderColor: isCrownRumpLengthValid || !isValid ? pink.pink6 : redDark.red8,
                        borderWidth: 2,
                        height: 60,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        textAlignVertical: "center",
                        textAlign: "center",
                        color: isCrownRumpLengthValid || !isValid ? pinkDark.pink7 : redDark.red8,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                >
                    mm
                </Text>
            </View>

            {
                isValid && !isCrownRumpLengthValid &&
                <View
                    style={{
                        position: "relative"
                    }}
                >
                    <View
                        style={{
                            backgroundColor: red.red4,
                            borderColor: redDark.red8,
                            borderWidth: 2,
                            borderRadius: 10,
                            height: 50,
                        }}
                    />

                    <Text
                        style={{
                            position: "absolute",
                            top: 0,
                            right: "15%",
                            width: "85%",
                            height: 50,
                            paddingHorizontal: 15,
                            color: redDark.red8,
                            fontSize: 13,
                            fontWeight: "500",
                            textAlignVertical: "center",
                        }}
                    >
                        La longueur cranio-caudale doit être comprise entre 15 et 95 mm
                    </Text>

                    <View
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            height: 50,
                            width: "15%",
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            backgroundColor: red.red7,
                            borderColor: redDark.red8,
                            borderWidth: 2,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <CircleAlert
                            color={redDark.red8}
                            size={24}
                        />
                    </View>
                </View>
            }

            <Pressable
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5
                }}
                onPress={() => onPressGestationalAgeCurve(GestationalAgeCurves.Intergrowth)}
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
                        color: pinkDark.pink5,
                    }}
                >
                    Courbe INTERGROWTH-21st
                </Text>
            </Pressable>

            <Pressable
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5
                }}

                onPress={() => onPressGestationalAgeCurve(GestationalAgeCurves.Robinson)}
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
                        color: pinkDark.pink5,
                    }}
                >
                    Courbe de Robinson
                </Text>
            </Pressable>
        </View>
    );
};