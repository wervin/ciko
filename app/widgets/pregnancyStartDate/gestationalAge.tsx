import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { orange, pink, pinkDark, red, yellowDark } from "@/utils/colors";
import { CalendarClock, CircleAlert, TriangleAlert } from "lucide-react-native";
import { View, Text } from "react-native";
import { PregnancyStartDateWidgetProps } from "../_widgets";
import { gestationalAge } from "./gestationalAgeCurve";
import { yellow } from "@/utils/colors/dark/yellow";


export const GestationalAge = () => {
    const widgetData = useWidgetStoreContext<PregnancyStartDateWidgetProps>((store) => store.widgetData);

    const gestationalAgeCurve = widgetData?.gestationalAgeCurve;
    const isValid = widgetData?.isValid ?? false;
    const isPresent = widgetData?.isPresent ?? false;
    const crownRumpLength = widgetData?.crownRumpLength ?? 0;
    const age = isPresent ? gestationalAge(crownRumpLength, gestationalAgeCurve) : undefined;

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
                Age Gestationnel
            </Text>

            <View
                style={{
                    height: 60,
                    borderRadius: 16,
                    flexDirection: "row",
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: pink.pink5,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: pinkDark.pink3,
                            fontSize: 22,
                            fontWeight: "700"
                        }}
                    >
                        {age ? `${Math.trunc(age / 7)} SA ${age % 7} J` : "-"}
                    </Text>
                </View>

                <View style={{
                    backgroundColor: pink.pink6,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    width: 60
                }}
                >
                    <CalendarClock
                        color={pinkDark.pink7}
                        size={24}
                    />
                </View>
            </View>

            {
                !isPresent &&

                <View style={{
                    flexDirection: "row",
                    height: 60,
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
                            height: 60,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            fontWeight: "700",
                            fontSize: 16,
                            color: pink.pink4
                        }}>
                            La longueur cranio-caudale doit être renseignée
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: red.red9,
                        height: 60,
                        width: 60,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CircleAlert size={24} color={pink.pink4} />
                    </View>

                </View>
            }

            {
                !isValid &&

                <View style={{
                    flexDirection: "row",
                    height: 60,
                    width: "100%",
                    alignItems: "center",
                }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: yellowDark.yellow11,
                            paddingHorizontal: 20,
                            borderColor: yellowDark.yellow11,
                            borderWidth: 2,
                            borderTopLeftRadius: 16,
                            borderBottomLeftRadius: 16,
                            height: 60,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            fontWeight: "700",
                            fontSize: 16,
                            color: pink.pink4
                        }}>
                            La longueur cranio-caudale doit être comprise entre 15 et 95 mm
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: yellowDark.yellow11,
                        height: 60,
                        width: 60,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <TriangleAlert size={24} color={pink.pink4} />
                    </View>

                </View>
            }
        </View>
    );
}