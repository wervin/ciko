import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { pink, pinkDark, red, whiteA } from "@/utils/colors";
import { CircleAlert, LineChart } from "lucide-react-native";
import { View, Text } from "react-native";
import { FetalGrowthWidgetProps } from "../_widgets";
import { ReferenceTables, computeIntergrowthGraphEstimatedFetalWeight, computeIntergrowthPercentileEstimatedFetalWeight, computeOmsGraphEstimatedFetalWeight, computeOmsPercentileEstimatedFetalWeight, updateGraph } from "./referenceTables";
import PressableOpacity from "@/components/pressableOpacity";
import { Fragment, useState } from "react";
import { GraphModal } from "./graphModal";

export const FetalWeight = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);

    const headCircumference = widgetData?.headCircumference ?? 0;
    const abdominalCircumference = widgetData?.abdominalCircumference ?? 0;
    const femurLength = widgetData?.femurLength ?? 0;
    const gestationalAge = widgetData?.gestationalAge ?? 0;
    const gestationalAgeValid = gestationalAge >= 14 && gestationalAge <= 300;
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;

    const isAbdominalCircumferenceValid = widgetData?.isAbdominalCircumferenceValid ?? false;
    const isHeadCircumferenceValid = widgetData?.isHeadCircumferenceValid ?? false;
    const isFemurLengthValid = widgetData?.isFemurLengthValid ?? false;

    const isValid = isAbdominalCircumferenceValid && isHeadCircumferenceValid && isFemurLengthValid && gestationalAgeValid;

    const fetalWeightWithHadlock = () => {
        // EFW = 10^(1.326 +0.0107×HC + 0.0438×AC + 0.158×FL - 0.00326×AC×FL)
        const hc = headCircumference * 0.1;
        const ac = abdominalCircumference * 0.1;
        const fl = femurLength * 0.1;
        return Math.pow(10, 1.326 + 0.0107 * hc + 0.0438 * ac + 0.158 * fl - 0.00326 * ac * fl)
    };

    const fetalWeight = isValid ?
        fetalWeightWithHadlock()
        :
        0;

    const graphData = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthGraphEstimatedFetalWeight(Math.trunc(gestationalAge / 7)) :
        computeOmsGraphEstimatedFetalWeight(Math.trunc(gestationalAge / 7));

    updateGraph(graphData, gestationalAge, fetalWeight);

    const fetalWeightPercentile = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthPercentileEstimatedFetalWeight(gestationalAge / 7, fetalWeight) :
        computeOmsPercentileEstimatedFetalWeight(gestationalAge / 7, fetalWeight);

    const fetalWeigthPercentileLabel = fetalWeightPercentile < 1 ?
        '<1%'
        :
        fetalWeightPercentile > 99 ?
            '>99%'
            :
            `${fetalWeightPercentile.toFixed(1)}%`;

    return (
        <Fragment>
            <GraphModal
                title={"Estimation du Poids Fœtal"}
                visible={modalVisible}
                setVisible={setModalVisible}
                graphData={graphData}
                yUnit={"g"}
                gestationalAge={gestationalAge}
                percentileLabel={fetalWeigthPercentileLabel}
                observed={fetalWeight}
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
                    Estimation du Poids Fœtal
                </Text>

                <View
                    style={{
                        height: 50,
                        borderRadius: 16,
                        flexDirection: "row",
                    }}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: pink.pink5,
                        alignItems: "center",
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                        flexDirection: "row"
                    }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                paddingLeft: 20,
                                textAlign: isValid ? "left" : "center",
                                textAlignVertical: "center",
                                color: pinkDark.pink3,
                                fontSize: 22,
                                fontWeight: "700"
                            }}
                        >
                            {isValid ? fetalWeight?.toFixed(1) : "-"}
                        </Text>

                        {
                            isValid &&

                            <View style={{
                                height: 50,
                                paddingHorizontal: 5,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <PressableOpacity
                                    style={{
                                        backgroundColor: pink.pink6,
                                        borderRadius: 16,
                                        height: 46,
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
                                        {fetalWeigthPercentileLabel}
                                    </Text>
                                    <View style={{
                                        backgroundColor: pink.pink7,
                                        height: 46,
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
                    </View>

                    <View style={{
                        backgroundColor: pink.pink6,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        width: 50
                    }}
                    >
                        <Text style={{
                            fontWeight: "700",
                            fontSize: 18,
                            color: pinkDark.pink7
                        }}>
                            g
                        </Text>
                    </View>
                </View>

                {
                    !isHeadCircumferenceValid &&

                    <View style={{
                        flexDirection: "row",
                        height: 50,
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
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                fontWeight: "700",
                                fontSize: 16,
                                color: whiteA.whiteA12
                            }}>
                                Le périmètre crânien doit être renseigné
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: red.red9,
                            height: 50,
                            width: 50,
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <CircleAlert size={24} color={whiteA.whiteA12} />
                        </View>
                    </View>
                }

                {
                    !isAbdominalCircumferenceValid &&

                    <View style={{
                        flexDirection: "row",
                        height: 50,
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
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                fontWeight: "700",
                                fontSize: 16,
                                color: whiteA.whiteA12
                            }}>
                                Le périmètre abdominal doit être renseigné
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: red.red9,
                            height: 50,
                            width: 50,
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <CircleAlert size={24} color={whiteA.whiteA12} />
                        </View>
                    </View>
                }

                {
                    !isFemurLengthValid &&

                    <View style={{
                        flexDirection: "row",
                        height: 50,
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
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                fontWeight: "700",
                                fontSize: 16,
                                color: whiteA.whiteA12
                            }}>
                                La longueur fémorale doit être renseignée
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: red.red9,
                            height: 50,
                            width: 50,
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <CircleAlert size={24} color={whiteA.whiteA12} />
                        </View>
                    </View>
                }

                {
                    !gestationalAgeValid &&

                    <View style={{
                        flexDirection: "row",
                        height: 50,
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
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{
                                textAlign: "center",
                                textAlignVertical: "center",
                                fontWeight: "700",
                                fontSize: 16,
                                color: whiteA.whiteA12
                            }}>
                                L'âge gestationnel n'est pas valide
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: red.red9,
                            height: 50,
                            width: 50,
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <CircleAlert size={24} color={whiteA.whiteA12} />
                        </View>
                    </View>
                }
            </View>
        </Fragment>
    );
};