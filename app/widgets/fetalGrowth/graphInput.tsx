import { Fragment, useState } from "react";
import { View, Text, TextInput, Platform } from "react-native";
import { GraphModal } from "./graphModal";
import { pink, pinkDark } from "@/utils/colors";
import PressableOpacity from "@/components/pressableOpacity";
import { LineChart } from "lucide-react-native";
import { ReferencePoint } from "./referenceTables";

interface GraphInputProps {
    title: string;
    unit: string;
    placeholder: string;
    graphData: ReferencePoint[];
    gestationalAge: number;
    percentileLabel: string;
    observed: number;
    isObservedValid: boolean;
    setObserved: (isObservedValid: boolean, observed?: number) => void;
};

export const GraphInput = ({ title, unit, placeholder, graphData, gestationalAge, percentileLabel, observed, isObservedValid, setObserved }: GraphInputProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    const onChangeObserved = (text: string) => {
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "")
            setObserved(false, undefined);
        else if (re.test(text))
            setObserved(true, parseFloat(text));
    };

    return (
        <Fragment>
            <GraphModal
                title={title}
                visible={modalVisible}
                setVisible={setModalVisible}
                graphData={graphData}
                yUnit={unit}
                gestationalAge={gestationalAge}
                percentileLabel={percentileLabel}
                observed={observed}
            />
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
                    {title}
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
                        onChangeText={onChangeObserved}
                        keyboardType='number-pad'
                        placeholder={placeholder}
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
                    {
                        isObservedValid &&

                        <View style={{
                            height: 50,
                            paddingHorizontal: 5,
                            backgroundColor: pink.pink4,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <PressableOpacity
                                style={{
                                    backgroundColor: pink.pink6,
                                    borderRadius: 16,
                                    height: 36,
                                    width: 110,
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                }}

                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={{
                                    flex: 1,
                                    fontWeight: "700",
                                    fontSize: 18,
                                    color: pinkDark.pink7,
                                    textAlign: "center",
                                    textAlignVertical: "center"
                                }}>
                                    {percentileLabel}
                                </Text>
                                <View style={{
                                    backgroundColor: pink.pink7,
                                    height: 36,
                                    width: 40,
                                    borderTopRightRadius: 16,
                                    borderBottomRightRadius: 16,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <LineChart
                                        color={pinkDark.pink7}
                                        size={24}
                                    />
                                </View>
                            </PressableOpacity>
                        </View>
                    }

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
                            {unit}
                        </Text>
                    </View>
                </View>
            </View>
        </Fragment>
    );
};