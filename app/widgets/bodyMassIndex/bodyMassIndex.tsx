import { pink, pinkDark, red, whiteA, yellowDark } from "@/utils/colors";
import { View, Text } from "react-native";
import { CircleAlert, TriangleAlert, Stethoscope } from 'lucide-react-native';
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { BodyMassIndexWidgetProps } from "../_widgets";

export const BodyMassIndex = () => {
    const widgetData = useWidgetStoreContext<BodyMassIndexWidgetProps>((store) => store.widgetData);

    const size = widgetData?.size;
    const weight = widgetData?.weight;
    const imc = size && weight ? weight / Math.pow(size / 100, 2) : 0;
    const label = imc < 18.5 ?
        "Insuffisance pondérale"
        : imc < 25 ?
            "Corpulence normale" :
            imc < 30 ?
                "Surpoids" :
                imc < 35 ?
                    "Obésité modérée" :
                    imc < 40 ?
                        "Obésité sévère" :
                        "Obésité morbide";

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
                Indice de Masse Corporelle
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
                    justifyContent: size && weight ? "space-between" : "center",
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
                        {size && weight ? imc.toFixed(1) : "-"}
                    </Text>
                    {
                        size && weight &&
                        <View style={{ backgroundColor: pink.pink6, borderRadius: 16, padding: 8 }}>
                            <Text
                                style={{
                                    color: pinkDark.pink7,
                                    fontSize: 16,
                                    fontWeight: "500"
                                }}
                            >
                                {label}
                            </Text>
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
                    <Stethoscope
                        color={pinkDark.pink7}
                        size={24}
                    />
                </View>
            </View>

            {
                size === undefined &&

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
                            La taille doit être renseignée
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
                weight === undefined &&

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
                            Le poids doit être renseigné
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