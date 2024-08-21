import { pink, pinkDark, red, redDark } from "@/utils/colors";
import { View, Text, TextInput, Pressable, NativeSyntheticEvent, TextInputEndEditingEventData } from "react-native";
import { CircleAlert } from "lucide-react-native";
import { useState } from "react";

interface AbdominalCircumferenceProps {
    abdominalCircumference: string;
    setAbdominalCircumference: (text: string) => void;
};

export const AbdominalCircumference = ({
    abdominalCircumference,
    setAbdominalCircumference
}: AbdominalCircumferenceProps) => {

    const [isAbdominalCircumferenceValid, setIsAbdominalCircumferenceValid] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const onChangeAbdominalCircumference = (text: string) => {
        setIsValid(false);
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "" || re.test(text))
            setAbdominalCircumference(text);
    };

    const onEndEditingAbdominalCircumference = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        const crl = parseFloat(e.nativeEvent.text);
        setIsValid(true);
        setIsAbdominalCircumferenceValid(crl < 15 || 95 < crl ? false : true)
    };

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
                Périmètre Abdominal
            </Text>

            <View
                style={{
                    position: "relative"
                }}
            >
                <TextInput
                    onChangeText={onChangeAbdominalCircumference}
                    onEndEditing={onEndEditingAbdominalCircumference}
                    keyboardType='numeric'
                    style={{
                        backgroundColor: isAbdominalCircumferenceValid || !isValid ? pink.pink2 : red.red4,
                        paddingHorizontal: 20,
                        borderColor: isAbdominalCircumferenceValid || !isValid ? pink.pink6 : redDark.red8,
                        borderWidth: 2,
                        borderRadius: 10,
                        height: 60,
                        color: isAbdominalCircumferenceValid || !isValid ? pinkDark.pink7 : redDark.red8,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                    maxLength={5}
                    cursorColor={isAbdominalCircumferenceValid || !isValid ? pink.pink7 : redDark.red8}
                    selectionColor={isAbdominalCircumferenceValid || !isValid ? pink.pink7 : redDark.red8}
                    value={abdominalCircumference}
                />
                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "15%",
                        backgroundColor: isAbdominalCircumferenceValid || !isValid ? pink.pink5 : red.red7,
                        borderColor: isAbdominalCircumferenceValid || !isValid ? pink.pink6 : redDark.red8,
                        borderWidth: 2,
                        height: 60,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        textAlignVertical: "center",
                        textAlign: "center",
                        color: isAbdominalCircumferenceValid || !isValid ? pinkDark.pink7 : redDark.red8,
                        fontSize: 22,
                        fontWeight: "700",
                    }}
                >
                    mm
                </Text>
            </View>

            {
                isValid && !isAbdominalCircumferenceValid &&
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
        </View>
    );
};