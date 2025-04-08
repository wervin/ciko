import { blackA, pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { View, Text } from "react-native";
import DatePicker from "@/components/datePicker";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { GestationalCalendarWidgetProps } from "../_widgets";

export const PeriodsDatePicker = () => {
    const widgetData = useWidgetStoreContext<GestationalCalendarWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: GestationalCalendarWidgetProps) => void>((store) => store.setWidgetData);

    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const periodsDate = () => {
        const d = new Date()
        d.setDate(d.getDate() - gestationalAge)
        return d;
    }

    const setCurrentDate = (date: Date) => {
        const d = new Date()
        const diffInMs = d.getTime() - date.getTime();
        const ga = Math.round(diffInMs / (1000 * 60 * 60 * 24));
        setWidgetData({ ...widgetData, gestationalAge: ga })
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
                Date des Dernières Régles
            </Text>

            <DatePicker date={periodsDate()} setDate={setCurrentDate} />
        </View>
    );
};