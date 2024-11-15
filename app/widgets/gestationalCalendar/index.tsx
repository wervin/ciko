import { View } from "react-native";
import withScrollView from "../_components/wrapper";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { useEffect } from "react";
import { GestationalCalendarWidget, GestationalCalendarWidgetData } from "../_widgets";
import { GestationalAgePicker } from "./gestationalAgePicker";
import { PregnancyStartDatePicker } from "./pregnancyStartDatePicker";
import { EchographyDates } from "./echographyDates";
import { MaternityLeaveDates } from "./maternityLeaveDates";
import { Term } from "./term";

const GestationalCalendar = () => {

    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(GestationalCalendarWidget);
        setWidgetData(GestationalCalendarWidgetData);
    }, []);

    return (
        widget &&
        <View
            style={{
                width: "100%",
                height: "100%",
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View style={{
                width: "100%",
                padding: 10,
                gap: 10
            }}>
                <GestationalAgePicker />
                <PregnancyStartDatePicker />
                <Term />
                <EchographyDates />
                <MaternityLeaveDates />
            </View>
        </View>
    );
};

export default withScrollView(GestationalCalendar);