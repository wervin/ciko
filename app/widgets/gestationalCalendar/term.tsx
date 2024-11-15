import { pink, pinkDark, red, yellowDark } from "@/utils/colors";
import { View, Text } from "react-native";
import { CalendarHeart, CircleAlert, TriangleAlert } from 'lucide-react-native';
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { GestationalCalendarWidgetProps } from "../_widgets";

export const Term = () => {
    const widgetData = useWidgetStoreContext<GestationalCalendarWidgetProps>((store) => store.widgetData);

    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const termDate = () => {
        const d = new Date();
        d.setDate(d.getDate() - gestationalAge + 14);
        d.setDate(d.getDate() + 273);
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
                    fontSize: 24,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Terme
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
                        {formatDateInFrench(termDate())}
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
                    <CalendarHeart
                        color={pinkDark.pink7}
                        size={24}
                    />
                </View>
            </View>
        </View>
    );
};