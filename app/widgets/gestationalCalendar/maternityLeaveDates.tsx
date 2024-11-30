import { blackA, pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { View, Text } from "react-native";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { GestationalCalendarWidgetProps } from "../_widgets";
import { Goal } from "lucide-react-native";
import { ReactNode } from "react";


interface MaternityLeaveCardProps {
    start: number;
    end: number;
    title: () => ReactNode;
};

const MaternityLeaveCard = ({ start, end, title }: MaternityLeaveCardProps) => {
    const widgetData = useWidgetStoreContext<GestationalCalendarWidgetProps>((store) => store.widgetData);

    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const pregnancyStartDate = () => {
        const d = new Date()
        d.setDate(d.getDate() - gestationalAge + 14)
        return d;
    };

    const getDateFromGestationalAge = (ga: number) => {
        const d = new Date(pregnancyStartDate());
        d.setDate(d.getDate() + ga - 14);
        return d;
    };

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

    const startDate = getDateFromGestationalAge(start);
    const endDate = getDateFromGestationalAge(end);

    const startGestationalAge = start % 7 ? `${Math.trunc(start / 7)}SA ${start % 7}J` : `${Math.trunc(start / 7)}SA`;
    const endGestationalAge = end % 7 ? `${Math.trunc(end / 7)}SA ${end % 7}J` : `${Math.trunc(end / 7)}SA`;

    return (
        <View style={{
            backgroundColor: pink.pink5,
            borderRadius: 16,
            padding: 10,
            gap: 10,
        }}>
            <View style={{
                gap: 5,
            }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        {title()}
                    </View>

                    <View style={{
                        height: 26,
                        width: (startGestationalAge.length + endGestationalAge.length) * 12 + 10,
                        borderRadius: 16,
                        backgroundColor: pink.pink7,
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Text
                            style={{
                                width: startGestationalAge.length * 12,
                                fontSize: 14,
                                fontWeight: "500",
                                color: pinkDark.pink7,
                                textAlign: "center"
                            }}
                        >
                            {startGestationalAge}
                        </Text>

                        <View style={{
                            height: 26,
                            backgroundColor: pink.pink8,
                            width: 10
                        }} />

                        <View style={{
                            height: 26,
                            width: endGestationalAge.length * 12,
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16,
                            backgroundColor: pink.pink8,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "500",
                                    color: pinkDark.pink7,
                                }}
                            >
                                {endGestationalAge}
                            </Text>
                        </View>

                        <View style={{
                            position: "absolute",
                            left: startGestationalAge.length * 12,
                            width: 0,
                            height: 0,
                            backgroundColor: "transparent",
                            borderTopWidth: 13,
                            borderBottomWidth: 13,
                            borderLeftWidth: 10,
                            borderBottomColor: "transparent",
                            borderTopColor: "transparent",
                            borderLeftColor: pink.pink7,
                        }} />
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "500",
                            color: pinkDark.pink3
                        }}
                    >
                        Du {formatDateInFrench(startDate)} au {formatDateInFrench(endDate)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export const MaternityLeaveDates = () => {

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
                Congé Maternité
            </Text>

            <MaternityLeaveCard
                start={245}
                end={357}
                title={() =>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: pinkDark.pink7
                        }}
                    >&lt;2 Enfants à Charge</Text>
                }
            />

            <MaternityLeaveCard
                start={231}
                end={413}
                title={() =>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: pinkDark.pink7
                        }}
                    >2+ Enfants à Charge</Text>
                }
            />

            <MaternityLeaveCard
                start={203}
                end={441}
                title={() =>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: pinkDark.pink7
                        }}
                    >Gémellaire</Text>
                }
            />

            <MaternityLeaveCard
                start={119}
                end={441}
                title={() =>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: pinkDark.pink7
                        }}
                    >Triplés et +</Text>
                }
            />
        </View >
    );
};