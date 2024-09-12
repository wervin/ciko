import { pink, pinkDark, red, redDark } from "@/utils/colors";
import { View, Text, TextInput, Pressable } from "react-native";
import { CircleAlert } from "lucide-react-native";
import { Shadow } from "react-native-shadow-2";

export const GestationalAgeCurves = {
    Intergrowth: 1,
    Robinson: 2
};

interface CrownRumpLengthInputProps {
    onChangeCrownRumpLength: (text: string) => void;
    crownRumpLength: string;
    isCrownRumpLengthValid: boolean;
    setIsCrownRumpLengthValid: (valid: boolean) => void;
    isValid: boolean;
    setIsValid: (valid: boolean) => void;
    onPressGestationalAgeCurve: (gestationalAgeCurve: number) => void;
    gestationalAgeCurve: number;
};

export const CrownRumpLengthInput = ({
    onChangeCrownRumpLength,
    crownRumpLength,
    isCrownRumpLengthValid,
    isValid,
    setIsValid,
    setIsCrownRumpLengthValid,
    onPressGestationalAgeCurve,
    gestationalAgeCurve
}: CrownRumpLengthInputProps) => {

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
                    onChangeText={onChangeCrownRumpLength}
                    onEndEditing={(e) => {
                        const crl = parseFloat(e.nativeEvent.text);
                        setIsValid(true);
                        setIsCrownRumpLengthValid(crl < 15 || 95 < crl ? false : true)
                    }}
                    keyboardType='numeric'
                    style={{
                        flex: 1,
                        textAlign: "center",
                        backgroundColor: isCrownRumpLengthValid || !isValid ? pink.pink4 : red.red4,
                        paddingHorizontal: 20,
                        borderColor: isCrownRumpLengthValid || !isValid ? pink.pink7 : redDark.red8,
                        borderWidth: 2,
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        height: 60,
                        color: isCrownRumpLengthValid || !isValid ? pinkDark.pink3 : redDark.red8,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                    maxLength={5}
                    cursorColor={isCrownRumpLengthValid || !isValid ? pink.pink7 : redDark.red8}
                    selectionColor={isCrownRumpLengthValid || !isValid ? pink.pink7 : redDark.red8}
                    value={crownRumpLength}
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
                onPress={() => onPressGestationalAgeCurve(GestationalAgeCurves.Intergrowth)}
            >
                <View
                    style={{
                        width: 26,
                        height: 26,
                        borderWidth: 2,
                        borderRadius: 26,
                        borderColor: pink.pink7,
                        backgroundColor: pink.pink4,
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
                        borderColor: pink.pink7,
                        backgroundColor: pink.pink4,
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
                    Courbe de Robinson
                </Text>
            </Pressable>
        </View>
    );
};