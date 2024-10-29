import { View } from "react-native";
import withScrollView from "../_components/wrapper";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { useEffect } from "react";
import { GestationalCalendarWidget, GestationalCalendarWidgetData } from "../_widgets";

const GestationalCalendar = () => {

    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(GestationalCalendarWidget);
        setWidgetData(GestationalCalendarWidgetData);
    }, []);

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >

        </View>
    );
};

export default withScrollView(GestationalCalendar);