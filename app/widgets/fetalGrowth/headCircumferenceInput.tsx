import { blackA, pink, pinkDark, purple, red, slate, teal } from "@/utils/colors";
import { View, Text, TextInput, Platform, Modal, TextInputProps } from "react-native";
import { LineChart, X } from "lucide-react-native";
import { FetalGrowthWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import PressableOpacity from "@/components/ui/pressableOpacity";
import { ReferencePoint, ReferenceTables, computeIntergrowthGraphHeadCircumference, computeIntergrowthPercentileHeadCircumference, computeOmsGraphHeadCircumference, computeOmsPercentileHeadCircumference, updateGraph } from "./referenceTables";
import { CartesianChart, Line, Scatter, useChartPressState } from "victory-native";
import { Fragment, useState } from "react";
import { Circle, DashPathEffect, useFont, Text as SkiaText, Skia, RoundedRect } from "@shopify/react-native-skia";
import { GestureHandlerRootView, HandlerStateChangeEvent, State, TapGestureHandler, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';
import Animated, { SharedValue, useAnimatedProps, useDerivedValue } from "react-native-reanimated";

interface HeadCircumferenceModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

interface HeadCircumferenceChartProps {
    data: ReferencePoint[];
};

interface PercentileIndicatorItem {
    value: SharedValue<string>;
    quantile: string
    color: string;
}

interface PercentileIndicatorsProps {
    gestationelAge: SharedValue<number>;
    items: PercentileIndicatorItem[];
};

const PercentileIndicators = ({ gestationelAge, items }: PercentileIndicatorsProps) => {
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);
    const fontSmall = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 8);

    const ga = useDerivedValue(() => {
        return `${Math.trunc(gestationelAge.value)}SA ${(gestationelAge.value * 7) % 7}J`
    });

    return (
        <>
            <RoundedRect rect={Skia.RRectXY(
                Skia.XYWHRect(52, 8, 82, 100),
                6,
                6)} color={pink.pink5} />
            <SkiaText
                x={56}
                y={20}
                text={ga}
                font={font}
                color={pinkDark.pink7}
            />

            {
                items.map((item, index) => {
                    return (
                        <Fragment key={item.quantile}>
                            <Circle cx={60} cy={28 + index * 12} r={4} color={item.color} />

                            <SkiaText
                                x={66}
                                y={32 + index * 12}
                                text={item.quantile}
                                font={font}
                                color={pinkDark.pink7}
                            />

                            <SkiaText
                                x={66 + item.quantile.length * 7}
                                y={28 + index * 12}
                                text="e"
                                font={fontSmall}
                                color={pinkDark.pink7}
                            />

                            <SkiaText
                                x={88}
                                y={32 + index * 12}
                                text={item.value}
                                font={font}
                                color={pinkDark.pink7}
                            />
                        </Fragment>
                    );
                })
            }
        </>
    );
};

const HeadCircumferenceChart = ({ data }: HeadCircumferenceChartProps) => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const gaDay = widgetData?.gestationalAge ?? 0;
    const gaWeek = Math.trunc(gaDay / 7);
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;
    const headCircumference = widgetData?.headCircumference ?? 0;

    const headCircumferencePercentile = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthPercentileHeadCircumference(gaDay / 7, headCircumference) :
        computeOmsPercentileHeadCircumference(gaDay / 7, headCircumference);

    const headCircumferencePercentileLabel = headCircumferencePercentile < 1 ?
        '<1'
        :
        headCircumferencePercentile > 99 ?
            '>99'
            :
            `${headCircumferencePercentile.toFixed(1)}`

    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);
    const fontSmall = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 8);

    const { state, isActive } = useChartPressState({
        x: 0,
        y: {
            observed: 0,
            quantile05: 0,
            quantile10: 0,
            quantile25: 0,
            quantile50: 0,
            quantile75: 0,
            quantile90: 0,
            quantile95: 0
        }
    });

    const percentileItems: PercentileIndicatorItem[] = [
        {
            quantile: '95',
            value: useDerivedValue(() => {
                return state.y.quantile95.value.value.toFixed(2)
            }),
            color: red.red9,
        },
        {
            quantile: '90',
            value: useDerivedValue(() => {
                return state.y.quantile90.value.value.toFixed(2)
            }),
            color: red.red8,
        },
        {
            quantile: '75',
            value: useDerivedValue(() => {
                return state.y.quantile75.value.value.toFixed(2)
            }),
            color: red.red7,
        },
        {
            quantile: '50',
            value: useDerivedValue(() => {
                return state.y.quantile50.value.value.toFixed(2)
            }),
            color: pink.pink10,
        },
        {
            quantile: '25',
            value: useDerivedValue(() => {
                return state.y.quantile25.value.value.toFixed(2)
            }),
            color: purple.purple7,
        },
        {
            quantile: '10',
            value: useDerivedValue(() => {
                return state.y.quantile10.value.value.toFixed(2)
            }),
            color: purple.purple8,
        },
        {
            quantile: '5',
            value: useDerivedValue(() => {
                return state.y.quantile05.value.value.toFixed(2)
            }),
            color: purple.purple9,
        },
    ]

    return (
        <View>
            <View style={{ height: 300, borderColor: pink.pink6, borderWidth: 1, borderRadius: 16 }}>
                <CartesianChart
                    data={data}
                    xKey="gaWeek"
                    yKeys={[
                        "observed",
                        "quantile05",
                        "quantile10",
                        "quantile25",
                        "quantile50",
                        "quantile75",
                        "quantile90",
                        "quantile95"
                    ]}
                    padding={{ left: 5 }}
                    xAxis={{
                        font: font,
                        labelColor: pinkDark.pink7,
                        tickCount: 3,
                        lineColor: pink.pink6,
                        lineWidth: 1,
                        formatXLabel: (label) => `${label}SA`
                    }}
                    yAxis={[{
                        font: font,
                        labelColor: pinkDark.pink7,
                        lineColor: pink.pink6,
                        lineWidth: 1,
                        formatYLabel: (label) => `${label}mm`
                    }]}
                    domain={{ x: [gaWeek - 1.1, gaWeek + 1.2] }}
                    chartPressState={state}
                >
                    {({ points }) => (
                        <>
                            <Line points={points.quantile05} color={purple.purple9} strokeWidth={2} />
                            <Line points={points.quantile10} color={purple.purple8} strokeWidth={2}>
                                <DashPathEffect intervals={[8, 4]} phase={0} />
                            </Line>
                            <Line points={points.quantile25} color={purple.purple7} strokeWidth={2}>
                                <DashPathEffect intervals={[4, 3]} phase={0} />
                            </Line>
                            <Line points={points.quantile50} color={pink.pink10} strokeWidth={2} />
                            <Line points={points.quantile75} color={red.red7} strokeWidth={2} >
                                <DashPathEffect intervals={[4, 3]} phase={0} />
                            </Line>
                            <Line points={points.quantile90} color={red.red8} strokeWidth={2} >
                                <DashPathEffect intervals={[8, 4]} phase={0} />
                            </Line>
                            <Line points={points.quantile95} color={red.red9} strokeWidth={2} />
                            {
                                isActive ?
                                    <>
                                        <Circle cx={state.x.position} cy={state.y.quantile05.position} r={4} color={purple.purple9} />
                                        <Circle cx={state.x.position} cy={state.y.quantile10.position} r={4} color={purple.purple8} />
                                        <Circle cx={state.x.position} cy={state.y.quantile25.position} r={4} color={purple.purple7} />
                                        <Circle cx={state.x.position} cy={state.y.quantile50.position} r={4} color={pink.pink10} />
                                        <Circle cx={state.x.position} cy={state.y.quantile75.position} r={4} color={red.red7} />
                                        <Circle cx={state.x.position} cy={state.y.quantile90.position} r={4} color={red.red8} />
                                        <Circle cx={state.x.position} cy={state.y.quantile95.position} r={4} color={red.red9} />
                                        <PercentileIndicators gestationelAge={state.x.value} items={percentileItems} />
                                    </>
                                    :
                                    <>
                                        <RoundedRect rect={Skia.RRectXY(
                                            Skia.XYWHRect(52, 8, 
                                                (headCircumferencePercentileLabel.length + headCircumference.toFixed(2).length) * 7 + 30, 
                                                28),
                                            6,
                                            6)} color={pink.pink5} />
                                        
                                        <Scatter
                                            points={points.observed}
                                            shape="circle"
                                            radius={4}
                                            style="fill"
                                            color={pinkDark.pink7}
                                        />

                                        <SkiaText
                                            x={56}
                                            y={20}
                                            text={`${Math.trunc(gaDay / 7)}SA ${gaDay % 7}J`}
                                            font={font}
                                            color={pinkDark.pink7}
                                        />

                                        <Circle cx={60} cy={28} r={4} color={pinkDark.pink7} />

                                        <SkiaText
                                            x={66}
                                            y={32}
                                            text={headCircumferencePercentileLabel}
                                            font={font}
                                            color={pinkDark.pink7}
                                        />

                                        <SkiaText
                                            x={66 + headCircumferencePercentileLabel.length * 7}
                                            y={28}
                                            text="e"
                                            font={fontSmall}
                                            color={pinkDark.pink7}
                                        />

                                        <SkiaText
                                            x={66 + headCircumferencePercentileLabel.length * 7 + 10}
                                            y={32}
                                            text={headCircumference.toFixed(2)}
                                            font={font}
                                            color={pinkDark.pink7}
                                        />
                                    </>
                            }
                        </>
                    )}
                </CartesianChart>
            </View>
        </View>
    );
};

const HeadCircumferenceModal = ({ visible, setVisible }: HeadCircumferenceModalProps) => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const gestationalAge = widgetData?.gestationalAge ?? 0;
    const headCircumference = widgetData?.headCircumference ?? 0;
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;
    const graphData = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthGraphHeadCircumference(Math.trunc(gestationalAge / 7)) :
        computeOmsGraphHeadCircumference(Math.trunc(gestationalAge / 7));

    updateGraph(graphData, gestationalAge, headCircumference);

    const handleOutsideTap = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
            setVisible(false);
        }
    };

    const handleInsideTap = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
        }
    };

    return (
        <Modal
            transparent={true}
            animationType={"fade"}
            visible={visible}
            onRequestClose={() => setVisible(false)}
            statusBarTranslucent
        >
            <GestureHandlerRootView>
                <TapGestureHandler onHandlerStateChange={handleOutsideTap}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: blackA.blackA8,
                        }}
                    >
                        <TapGestureHandler onHandlerStateChange={handleInsideTap}>
                            <View
                                style={{
                                    width: "90%",
                                    backgroundColor: pink.pink4,
                                    borderRadius: 16,
                                    overflow: "hidden"
                                }}
                            >
                                <View style={{
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
                                        Périmètre Crânien
                                    </Text>

                                    <PressableOpacity
                                        style={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: pink.pink7,
                                            borderRadius: 30,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        onPress={() => setVisible(false)}
                                    >
                                        <X
                                            width={20}
                                            height={20}
                                            color={pinkDark.pink7}
                                        />
                                    </PressableOpacity>
                                </View>

                                <View
                                    style={{
                                        padding: 10,
                                        borderBottomLeftRadius: 16,
                                        borderBottomRightRadius: 16,
                                        gap: 30,
                                    }}
                                >
                                    <HeadCircumferenceChart data={graphData} />
                                </View>
                            </View>
                        </TapGestureHandler>
                    </View>
                </TapGestureHandler>
            </GestureHandlerRootView >
        </Modal >
    );
};

export const HeadCircumferenceInput = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(date: FetalGrowthWidgetProps) => void>((store) => store.setWidgetData);

    const isHeadCircumferenceValid = widgetData?.isHeadCircumferenceValid ?? false;
    const headCircumference = widgetData?.headCircumference ?? 0;
    const referenceTable = widgetData?.referenceTable ?? ReferenceTables.Intergrowth;
    const gestationelAge = widgetData?.gestationalAge ?? 0;

    const onChangeHeadCircumference = (text: string) => {
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "")
            setWidgetData({ ...widgetData, isHeadCircumferenceValid: false, headCircumference: undefined })
        else if (re.test(text))
            setWidgetData({ ...widgetData, isHeadCircumferenceValid: true, headCircumference: parseFloat(text) })
    };

    const headCircumferencePercentile = referenceTable === ReferenceTables.Intergrowth ?
        computeIntergrowthPercentileHeadCircumference(gestationelAge / 7, headCircumference) :
        computeOmsPercentileHeadCircumference(gestationelAge / 7, headCircumference);

    const headCircumferencePercentileLabel = headCircumferencePercentile < 1 ?
        '<1%'
        :
        headCircumferencePercentile > 99 ?
            '>99%'
            :
            `${headCircumferencePercentile.toFixed(1)}%`

    return (
        <>
            <HeadCircumferenceModal visible={modalVisible} setVisible={setModalVisible} />
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
                        onChangeText={onChangeHeadCircumference}
                        keyboardType='numeric'
                        multiline={Platform.OS === "ios" ? false : true}
                        placeholder="Saisir un périmètre"
                        placeholderTextColor={pink.pink6}
                        style={{
                            flex: 1,
                            backgroundColor: pink.pink4,
                            paddingHorizontal: 20,
                            borderLeftWidth: 2,
                            borderTopWidth: 2,
                            borderBottomWidth: 2,
                            borderLeftColor: pink.pink7,
                            borderTopColor: pink.pink7,
                            borderBottomColor: pink.pink7,
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
                    />
                    {
                        isHeadCircumferenceValid &&

                        <View style={{
                            borderTopWidth: 2,
                            borderBottomWidth: 2,
                            borderTopColor: pink.pink7,
                            borderBottomColor: pink.pink7,
                            height: 60,
                            paddingHorizontal: 5,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <PressableOpacity
                                style={{
                                    backgroundColor: pink.pink5,
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
                                    {headCircumferencePercentileLabel}
                                </Text>
                                <View style={{
                                    backgroundColor: pink.pink6,
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
            </View>
        </>
    );
};