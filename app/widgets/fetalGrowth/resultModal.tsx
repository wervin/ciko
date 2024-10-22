import { View, Text, Modal, Pressable } from "react-native";
import { blackA, pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { X, ScatterChart, Check } from "lucide-react-native";
import PressableOpacity from "@/components/ui/pressableOpacity";
import { FetalGrowthWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { CartesianChart, Line } from "victory-native";

const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
}));

const TestChart = () => {
    return (
        <View style={{ height: 300 }}>
            <CartesianChart data={DATA} xKey="day" yKeys={["highTmp"]}>
                {({ points }) => (
                    <Line points={points.highTmp} color="red" strokeWidth={3} />
                )}
            </CartesianChart>
        </View>
    );
};

export const ResultModal = () => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    const fetalWeightWithHadlock = () => {
        // EFW = 10^(1.326 +0.0107×HC + 0.0438×AC + 0.158×FL - 0.00326×AC×FL)
        const hc = widgetData?.headCircumference ?? 0;
        const ac = widgetData?.abdominalCircumference ?? 0;
        const fl = widgetData?.femurLength ?? 0;
        return Math.pow(10, 1.326 + 0.0107 * hc + 0.0438 * ac + 0.158 * fl - 0.00326 * ac * fl)
    };

    return (
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
                    <Text>Test</Text>
                    <PressableOpacity
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
                    </PressableOpacity>
                </View>

                <View
                    style={{
                        width: "90%",
                        backgroundColor: pink.pink4,
                        padding: 20,
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                        gap: 30,
                        overflow: "hidden"
                    }}
                >
                    <TestChart />
                </View>
            </Pressable>
        </Modal>
    )
};