import PressableOpacity from "@/components/pressableOpacity";
import { blackA, pink, pinkDark, purple, red } from "@/utils/colors";
import { X } from "lucide-react-native";
import { Modal, View, Text } from "react-native";
import { GestureHandlerRootView, HandlerStateChangeEvent, State, TapGestureHandler, TapGestureHandlerEventPayload } from "react-native-gesture-handler";
import { ReferencePoint, updateGraph } from "../../app/widgets/fetalGrowth/referenceTables";
import { CartesianChart, ChartPressState, Line, PointsArray, Scatter, useChartPressState } from "victory-native";
import { DashPathEffect, RoundedRect, Skia, Circle, Text as SkiaText, useFont } from "@shopify/react-native-skia";
import { Fragment } from "react";
import { SharedValue, useDerivedValue } from "react-native-reanimated";

interface GraphState {
    x: number;
    y: {
        observed: number;
        quantile05: number;
        quantile10: number;
        quantile25: number;
        quantile50: number;
        quantile75: number;
        quantile90: number;
        quantile95: number;
    };
};

interface GraphPercentileIndicatorItem {
    value: SharedValue<string>;
    quantile: string
    color: string;
}

interface GraphPercentileToolTipProps {
    state: ChartPressState<GraphState>;
    yUnit: string;
};

interface GraphObservedToolTipProps {
    gestationalAge: number;
    percentileLabel: string;
    observed: number;
    pointsObserved: PointsArray;
    yUnit: string;
};

interface GraphProps {
    graphData: ReferencePoint[];
    yUnit: string;
    gestationalAge: number;
    percentileLabel: string;
    observed: number;
};

interface GraphModalProps {
    title: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    graphData: ReferencePoint[];
    yUnit: string;
    gestationalAge: number;
    percentileLabel: string;
    observed: number;
};

const GraphPercentileToolTip = ({ state, yUnit }: GraphPercentileToolTipProps) => {
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);

    const ga = useDerivedValue(() => {
        return `${Math.trunc(state.x.value.value / 7)}SA ${state.x.value.value % 7}J`
    });

    const percentileItems: GraphPercentileIndicatorItem[] = [
        {
            quantile: '95%',
            value: useDerivedValue(() => {
                return state.y.quantile95.value.value.toFixed(0) + yUnit
            }),
            color: red.red9,
        },
        {
            quantile: '90%',
            value: useDerivedValue(() => {
                return state.y.quantile90.value.value.toFixed(0) + yUnit
            }),
            color: red.red8,
        },
        {
            quantile: '75%',
            value: useDerivedValue(() => {
                return state.y.quantile75.value.value.toFixed(0) + yUnit
            }),
            color: red.red7,
        },
        {
            quantile: '50%',
            value: useDerivedValue(() => {
                return state.y.quantile50.value.value.toFixed(0) + yUnit
            }),
            color: pink.pink10,
        },
        {
            quantile: '25%',
            value: useDerivedValue(() => {
                return state.y.quantile25.value.value.toFixed(0) + yUnit
            }),
            color: purple.purple7,
        },
        {
            quantile: '10%',
            value: useDerivedValue(() => {
                return state.y.quantile10.value.value.toFixed(0) + yUnit
            }),
            color: purple.purple8,
        },
        {
            quantile: '5%',
            value: useDerivedValue(() => {
                return state.y.quantile05.value.value.toFixed(0) + yUnit
            }),
            color: purple.purple9,
        },
    ]

    return (
        <Fragment>
            <Circle cx={state.x.position} cy={state.y.quantile05.position} r={4} color={purple.purple9} />
            <Circle cx={state.x.position} cy={state.y.quantile10.position} r={4} color={purple.purple8} />
            <Circle cx={state.x.position} cy={state.y.quantile25.position} r={4} color={purple.purple7} />
            <Circle cx={state.x.position} cy={state.y.quantile50.position} r={4} color={pink.pink10} />
            <Circle cx={state.x.position} cy={state.y.quantile75.position} r={4} color={red.red7} />
            <Circle cx={state.x.position} cy={state.y.quantile90.position} r={4} color={red.red8} />
            <Circle cx={state.x.position} cy={state.y.quantile95.position} r={4} color={red.red9} />
            <RoundedRect rect={Skia.RRectXY(
                Skia.XYWHRect(
                    52,
                    8,
                    90,
                    100),
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
                percentileItems.map((item, index) => {
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
                                x={102}
                                y={32 + index * 12}
                                text={item.value}
                                font={font}
                                color={pinkDark.pink7}
                            />
                        </Fragment>
                    );
                })
            }
        </Fragment>
    )
};

const GraphObservedToolTip = ({ percentileLabel, gestationalAge, observed, pointsObserved, yUnit }: GraphObservedToolTipProps) => {
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);

    return (
        <Fragment>
            <RoundedRect rect={Skia.RRectXY(
                Skia.XYWHRect(
                    52,
                    8,
                    (percentileLabel.length + observed.toFixed(2).length) * 7 + 24,
                    28
                ),
                6,
                6)} color={pink.pink5} />

            <Scatter
                points={pointsObserved}
                shape="circle"
                radius={4}
                style="fill"
                color={pinkDark.pink7}
            />

            <SkiaText
                x={56}
                y={20}
                text={`${Math.trunc(gestationalAge / 7)}SA ${gestationalAge % 7}J`}
                font={font}
                color={pinkDark.pink7}
            />

            <Circle cx={60} cy={28} r={4} color={pinkDark.pink7} />

            <SkiaText
                x={66}
                y={32}
                text={percentileLabel}
                font={font}
                color={pinkDark.pink7}
            />

            <SkiaText
                x={66 + percentileLabel.length * 7 + 10}
                y={32}
                text={observed.toFixed(0) + yUnit}
                font={font}
                color={pinkDark.pink7}
            />
        </Fragment>
    );
}

const Graph = ({ graphData, yUnit, gestationalAge, observed, percentileLabel }: GraphProps) => {
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);

    const gaWeek = Math.trunc(gestationalAge / 7) * 7;

    const { state, isActive } = useChartPressState<GraphState>({
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

    return (
        <View>
            <View style={{ height: 300, minWidth: 300, borderColor: pink.pink6, borderWidth: 1, borderRadius: 16 }}>
                <CartesianChart
                    data={graphData}
                    xKey="gaDay"
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
                        tickValues: [gaWeek - 7, gaWeek, gaWeek + 7],
                        lineColor: pink.pink6,
                        lineWidth: 1,
                        formatXLabel: (label) => `${Math.trunc(label / 7)}SA`
                    }}
                    yAxis={[{
                        font: font,
                        labelColor: pinkDark.pink7,
                        lineColor: pink.pink6,
                        lineWidth: 1,
                        formatYLabel: (label) => `${label}${yUnit}`
                    }]}
                    domain={{ x: [gaWeek - 10, gaWeek + 10] }}
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
                                    <GraphPercentileToolTip
                                        state={state}
                                        yUnit={yUnit}
                                    />
                                    :
                                    <GraphObservedToolTip
                                        percentileLabel={percentileLabel}
                                        gestationalAge={gestationalAge}
                                        observed={observed}
                                        pointsObserved={points.observed}
                                        yUnit={yUnit}
                                    />
                            }
                        </>
                    )}
                </CartesianChart>
            </View>
        </View>
    );
};

export const GraphModal = ({ title, visible, setVisible, graphData, yUnit, gestationalAge, percentileLabel, observed }: GraphModalProps) => {
    const handleOutsideTap = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
            setVisible(false);
        }
    };

    const handleInsideTap = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
        }
    };

    updateGraph(graphData, gestationalAge, observed);

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
                                        fontSize: 22,
                                        fontWeight: "700",
                                        color: pinkDark.pink7
                                    }}>
                                        {title}
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
                                    <Graph
                                        graphData={graphData}
                                        yUnit={yUnit}
                                        gestationalAge={gestationalAge}
                                        observed={observed}
                                        percentileLabel={percentileLabel}
                                    />
                                </View>
                            </View>
                        </TapGestureHandler>
                    </View>
                </TapGestureHandler>
            </GestureHandlerRootView >
        </Modal >
    );
};