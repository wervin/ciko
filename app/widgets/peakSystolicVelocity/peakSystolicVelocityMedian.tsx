import { pink, pinkDark } from "@/utils/colors";
import { View, Text } from "react-native";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { PeakSystolicVelocityWidgetProps } from "../_widgets";

export const PeakSystolicVelocityMedian = () => {
    const widgetData = useWidgetStoreContext<PeakSystolicVelocityWidgetProps>((store) => store.widgetData);

    const gestationalAge = widgetData?.gestationalAge;

    const psv = Math.exp(2.30921 + 0.0463954 * (gestationalAge / 7));

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
                    fontSize: 22,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Pic Systolique de Vélocité Médian de l'Artère Cérébrale Moyenne
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
                        {psv.toFixed(1)}
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
                        cm/s
                    </Text>
                </View>
            </View>
        </View>
    );
};