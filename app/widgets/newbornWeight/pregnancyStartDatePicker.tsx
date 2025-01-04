import { blackA, pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { View, Text } from "react-native";
import DatePicker from "@/components/datePicker";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { NewbornWeightWidgetProps } from "../_widgets";

export const PregnancyStartDatePicker = () => {
    const widgetData = useWidgetStoreContext<NewbornWeightWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: NewbornWeightWidgetProps) => void>((store) => store.setWidgetData);

    const gestationalAge = widgetData?.gestationalAge ?? 0;

    const pregnancyStartDate = () => {
        const d = new Date()
        d.setDate(d.getDate() - gestationalAge + 14)
        return d;
    }

    const setCurrentDate = (date: Date) => {
        const d = new Date()
        const diffInMs = d.getTime() - date.getTime();
        const ga = Math.round(diffInMs / (1000 * 60 * 60 * 24)) + 14;
        setWidgetData({ ...widgetData, gestationalAge: ga < 14 ? 14 : ga })
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

            <DatePicker date={pregnancyStartDate()} setDate={setCurrentDate} />
        </View>
    );
};