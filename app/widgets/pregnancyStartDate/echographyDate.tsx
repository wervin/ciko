import { blackA, pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { View, Text, Pressable, Modal } from "react-native";
import DatePicker from "@/components/datePicker";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { PregnancyStartDateWidget, PregnancyStartDateWidgetProps } from "../_widgets";

export const EchographyDate = () => {
    const widgetData = useWidgetStoreContext<PregnancyStartDateWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: PregnancyStartDateWidgetProps) => void>((store) => store.setWidgetData);

    const setCurrentDate = (date: Date) => {
        setWidgetData({ ...widgetData, echographyDate: date })
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
                    fontSize: 20,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Date de l'Echographie
            </Text>

            <DatePicker date={widgetData?.echographyDate ?? new Date()} setDate={setCurrentDate} />
        </View>
    );
};