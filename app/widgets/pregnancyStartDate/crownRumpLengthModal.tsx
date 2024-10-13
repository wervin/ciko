import { useState, useEffect, memo } from "react";
import { Pressable, View, Text, Modal, LayoutChangeEvent } from "react-native";
import { EchographyDate } from "./echographyDate";
import { CrownRumpLengthInput, GestationalAgeCurveType, GestationalAgeCurves } from "./crownRumpLengthInput";
import { GestiationalAge } from "./gestiationalAge";
import { PregnancyStartDate } from "./pregnancyStartDate";
import { Term } from "./term";
import { blackA, pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { X, ScatterChart, Check } from "lucide-react-native";
import { PregnancyStartDateWidgetProps } from "../_components/widgets";

interface CrownRumpLengthModalProps {
    echographyDate: Date;
};

export const CrownRumpLengthModal = ({ echographyDate }: CrownRumpLengthModalProps) => {
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
    const [gestationalAgeCurve, setGestationalAgeCurve] = useState(GestationalAgeCurves.Intergrowth);
    const widgetData = useWidgetStoreContext<PregnancyStartDateWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    const robinson = (crl: number) => {
        return Math.round(8.052 * Math.sqrt(crl * 1.037) + 23.73);
    }

    const intergrowth = (crl: number) => {
        return Math.round(40.9041 + 3.21585 * Math.sqrt(crl) + 0.348956 * crl)
    }

    const gestationalAge = (crl: number) => {
        return gestationalAgeCurve === GestationalAgeCurves.Robinson ? robinson(crl) : intergrowth(crl)
    };

    const pregnancyStartDate = (crl: number) => {
        const d = new Date(echographyDate)
        d.setDate(d.getDate() - gestationalAge(crl) + 14)
        return d;
    }

    const termDate = (crl: number) => {
        const d = new Date(echographyDate)
        d.setDate(d.getDate() - gestationalAge(crl) + 14);
        d.setDate(d.getDate() + 273);
        return d;
    }

    const onGestationalAgeCurveChange = (curve: GestationalAgeCurveType) => {
        setDescriptionModalVisible(false);
        setGestationalAgeCurve(curve);
    };

    return (
        <>
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={descriptionModalVisible}
                onRequestClose={() => setDescriptionModalVisible(false)}
                statusBarTranslucent
            >
                <Pressable
                    onPress={(event) => {
                        if (event.target == event.currentTarget) {
                            setDescriptionModalVisible(false);
                        }
                    }}

                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: blackA.blackA8,
                    }}
                >

                    <View style={{
                        width: "80%",
                        padding: 10,
                        backgroundColor: pink.pink5,
                        borderBottomWidth: 1,
                        borderBottomColor: pink.pink6,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: "700",
                            color: pinkDark.pink7
                        }}>
                            Courbe de Réference
                        </Text>
                        <Pressable
                            style={{
                                width: 30,
                                height: 30,
                                backgroundColor: pink.pink7,
                                borderRadius: 30,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onPress={() => setDescriptionModalVisible(false)}
                        >

                            <X
                                width={20}
                                height={20}
                                color={pinkDark.pink7}
                            />
                        </Pressable>
                    </View>

                    <View style={{
                        width: "80%",
                        backgroundColor: pink.pink4,
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16
                    }}>

                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                backgroundColor: gestationalAgeCurve === GestationalAgeCurves.Intergrowth ? pink.pink5 : pink.pink4
                            }}
                            onPress={() => onGestationalAgeCurveChange(GestationalAgeCurves.Intergrowth)}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: "700",
                                    color: pinkDark.pink7,
                                }}>
                                    INTERGROWTH-21
                                </Text>
                                <Text style={{
                                    fontSize: 12,
                                    lineHeight: 20,
                                    marginLeft: -1,
                                    color: pinkDark.pink7,
                                    fontWeight: "700",
                                    textAlignVertical: 'top',
                                }}>
                                    st
                                </Text>
                            </View>

                            {gestationalAgeCurve === GestationalAgeCurves.Intergrowth && <Check size={18} color={pinkDark.pink7} />}
                        </Pressable>

                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                backgroundColor: gestationalAgeCurve === GestationalAgeCurves.Robinson ? pink.pink5 : pink.pink4,
                                borderBottomLeftRadius: 16,
                                borderBottomRightRadius: 16
                            }}
                            onPress={() => onGestationalAgeCurveChange(GestationalAgeCurves.Robinson)}
                        >

                            <Text style={{
                                fontSize: 20,
                                fontWeight: "700",
                                color: pinkDark.pink7,
                            }}>
                                Robinson
                            </Text>

                            {gestationalAgeCurve === GestationalAgeCurves.Robinson && <Check size={18} color={pinkDark.pink7} />}
                        </Pressable>

                    </View>
                </Pressable>
            </Modal>

            <Modal
                transparent={true}
                animationType={"fade"}
                visible={widgetData?.visible}
                onRequestClose={() => setWidgetData({ ...widgetData, visible: false })}
                statusBarTranslucent
            >
                <Pressable
                    onPress={(event) => {
                        if (event.target == event.currentTarget) {
                            setWidgetData({ ...widgetData, visible: false });
                        }
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: blackA.blackA8,
                    }}
                >

                    <View style={{
                        width: "90%",
                        padding: 10,
                        backgroundColor: pink.pink5,
                        borderBottomWidth: 1,
                        borderBottomColor: pink.pink6,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <Pressable
                            onPress={() => setDescriptionModalVisible(true)}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: pink.pink7,
                                borderRadius: 16,
                                gap: 16,
                                height: 48
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    paddingLeft: 16
                                }}
                            >
                                {
                                    gestationalAgeCurve === GestationalAgeCurves.Intergrowth ?
                                        <>
                                            <Text style={{
                                                fontSize: 20,
                                                fontWeight: "700",
                                                color: pinkDark.pink7,
                                            }}>
                                                INTERGROWTH-21
                                            </Text>
                                            <Text style={{
                                                fontSize: 12,
                                                lineHeight: 20,
                                                marginLeft: -1,
                                                color: pinkDark.pink7,
                                                fontWeight: "700",
                                                textAlignVertical: 'top',
                                            }}>
                                                st
                                            </Text>
                                        </>
                                        :
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: pinkDark.pink7,
                                        }}>
                                            Robinson
                                        </Text>
                                }
                            </View>

                            <View
                                style={{
                                    backgroundColor: pinkDark.pink7,
                                    borderTopRightRadius: 16,
                                    borderBottomRightRadius: 16,
                                    height: 48,
                                    width: 32,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <ScatterChart
                                    width={20}
                                    height={20}
                                    color={pink.pink7}
                                />
                            </View>
                        </Pressable>

                        <Pressable
                            style={{
                                width: 30,
                                height: 30,
                                backgroundColor: pink.pink7,
                                borderRadius: 30,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onPress={() => setWidgetData({ ...widgetData, visible: false })}
                        >

                            <X
                                width={20}
                                height={20}
                                color={pinkDark.pink7}
                            />
                        </Pressable>
                    </View>

                    <View
                        style={{
                            width: "90%",
                            backgroundColor: pink.pink4,
                            padding: 20,
                            borderBottomLeftRadius: 16,
                            borderBottomRightRadius: 16,
                            gap: 20,
                            overflow: "hidden"
                        }}
                    >
                        <GestiationalAge gestationalAge={gestationalAge(widgetData?.crownRumpLength ?? 0)} />

                        <View style={{ borderTopWidth: 2, borderTopColor: pink.pink6 }}></View>

                        <PregnancyStartDate pregnancyStartDate={pregnancyStartDate(widgetData?.crownRumpLength ?? 0)} />

                        <View style={{ borderTopWidth: 2, borderTopColor: pink.pink6 }}></View>

                        <Term termDate={termDate(widgetData?.crownRumpLength ?? 0)} />

                    </View>
                </Pressable>
            </Modal>
        </>
    );
};