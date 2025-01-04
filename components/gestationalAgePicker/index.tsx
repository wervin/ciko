import { pink, pinkDark } from "@/utils/colors";
import { View, Text } from "react-native";
import { GestationalCalendarWidgetProps } from "../../app/widgets/_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import React from "react";
import { DropDownButton } from "../dropDownButton";

export const GestationalAgePicker = () => {

    const widgetData = useWidgetStoreContext<GestationalCalendarWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: GestationalCalendarWidgetProps) => void>((store) => store.setWidgetData);
    const day = widgetData?.gestationalAge ? Math.abs(widgetData.gestationalAge % 7) : 0;
    const week = widgetData?.gestationalAge ? Math.trunc(widgetData.gestationalAge / 7) : 0;

    const weeks = Array.from({ length: 41 }, (_, i) => i + 2);
    const weekInitialScrollIndex = week > 42 ? 0 : week > 5 ? week - 5 : 0;
    const weekButtonLabel = `${week} SA`;
    const weekModalLabel = "Semaine Aménorrhée";
    const weekOnPress = (item: number) => {
        const gestationalAge = item * 7 + day;
        setWidgetData({ ...widgetData, gestationalAge });
    };

    const days = Array.from({ length: 7 }, (_, i) => i);
    const dayInitialScrollIndex = 0;
    const dayButtonLabel = `${day} J`;
    const dayModalLabel = "Jour";
    const dayOnPress = (item: number) => {
        const gestationalAge = week * 7 + item;
        setWidgetData({ ...widgetData, gestationalAge });
    };

    return (
        <>
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
                    Age Gestationnel
                </Text>

                <View
                    style={{
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        overflow: "hidden",
                        borderRadius: 16
                    }}
                >
                    <DropDownButton<number>
                        current={week}
                        data={weeks}
                        initialScrollIndex={weekInitialScrollIndex}
                        buttonLabel={weekButtonLabel}
                        modalLabel={weekModalLabel}
                        onPress={weekOnPress}
                        style={{
                            flex: 1,
                        }}
                    />

                    <View style={{ backgroundColor: pinkDark.pink7, width: 1, height: "100%" }} />

                    <DropDownButton<number>
                        current={day}
                        data={days}
                        initialScrollIndex={dayInitialScrollIndex}
                        buttonLabel={dayButtonLabel}
                        modalLabel={dayModalLabel}
                        onPress={dayOnPress}
                        style={{
                            flex: 1,
                        }}
                    />
                </View>
            </View>
        </>
    );
};