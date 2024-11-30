import { pink, pinkDark, red, whiteA, yellowDark } from "@/utils/colors";
import { View, Text } from "react-native";
import { CircleAlert, TriangleAlert, Stethoscope } from 'lucide-react-native';
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { PeakSystolicVelocityWidgetProps } from "../_widgets";

export const MultipleOfMedian = () => {
    const widgetData = useWidgetStoreContext<PeakSystolicVelocityWidgetProps>((store) => store.widgetData);

    const gestationalAge = widgetData?.gestationalAge;
    const peakSystolicVelocity = widgetData?.peakSystolicVelocity;

    const psv = Math.exp(2.30921 + 0.0463954 * (gestationalAge / 7));
    const mom = peakSystolicVelocity ? peakSystolicVelocity / psv : undefined;

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
                    fontSize: 20,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Multiple de la Médiane
            </Text>

            <View
                style={{
                    height: 50,
                    borderRadius: 16,
                    flexDirection: "row"
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: pink.pink5,
                    borderColor: pink.pink5,
                    borderWidth: 2,
                    alignItems: "center",
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    gap: 10
                }}
                >
                    <Text
                        style={{
                            flex: 1,
                            color: pinkDark.pink3,
                            textAlign: "center",
                            fontSize: 22,
                            fontWeight: "700"
                        }}
                    >
                        {mom ? mom.toFixed(1) : "-"}
                    </Text>
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
                        MoM
                    </Text>
                </View>
            </View>

            {
                peakSystolicVelocity === undefined &&

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
                            Le pic systolique de vélocité doit être renseignée
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
    );
};