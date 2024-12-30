import { pink, pinkDark, red, whiteA, yellowDark } from "@/utils/colors";
import { View, Text } from "react-native";
import { CalendarDays, CircleAlert, TriangleAlert } from 'lucide-react-native';
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { PregnancyStartDateWidgetProps } from "../_widgets";
import { gestationalAge } from "./gestationalAgeCurve";

export const PregnancyStartDate = () => {
    const widgetData = useWidgetStoreContext<PregnancyStartDateWidgetProps>((store) => store.widgetData);

    const gestationalAgeCurve = widgetData?.gestationalAgeCurve;
    const echographyDate = widgetData?.echographyDate ?? new Date();
    const isValid = widgetData?.isValid ?? false;
    const isPresent = widgetData?.isPresent ?? false;
    const crownRumpLength = widgetData?.crownRumpLength ?? 0;
    const age = isPresent ? gestationalAge(crownRumpLength, gestationalAgeCurve) : undefined;

    const pregnancyStartDate = (age: number) => {
        const d = new Date(echographyDate)
        d.setDate(d.getDate() - age + 14)
        return d;
    }

    const formatDateInFrench = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };

        // Format the date using the French locale
        const formattedDate = date.toLocaleDateString('fr-FR', options);

        // Capitalize the first letter of the month
        return formattedDate.replace(
            /([0-9]+ )([a-z\u00E0-\u00FC])/,
            (_, daySpace, monthFirstLetter) => {
                return daySpace + monthFirstLetter.toUpperCase();
            }
        );
    }

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
                Date de Début de Grossesse
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
                    borderColor: pink.pink5,
                    borderWidth: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                }}
                >
                    <Text
                        style={{
                            color: pinkDark.pink3,
                            fontSize: 22,
                            fontWeight: "700"
                        }}
                    >
                        {age ? formatDateInFrench(pregnancyStartDate(age)) : "-"}
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
                    <CalendarDays
                        color={pinkDark.pink7}
                        size={24}
                    />
                </View>
            </View>

            {
                !isPresent &&

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
                            La longueur cranio-caudale doit être renseignée
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
                !isValid &&

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
                            backgroundColor: yellowDark.yellow11,
                            paddingHorizontal: 20,
                            borderColor: yellowDark.yellow11,
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
                            fontSize: 15,
                            color: whiteA.whiteA12
                        }}>
                            La longueur cranio-caudale doit être comprise entre 15 et 95 mm
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: yellowDark.yellow11,
                        height: 50,
                        width: 50,
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <TriangleAlert size={24} color={whiteA.whiteA12} />
                    </View>

                </View>
            }
        </View>
    );
};