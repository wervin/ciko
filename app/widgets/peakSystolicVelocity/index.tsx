import { View } from "react-native";
import withScrollView from "../_components/wrapper";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { useEffect } from "react";
import { PeakSystolicVelocityWidget, PeakSystolicVelocityWidgetData } from "../_widgets";
import { GestationalAgePicker } from "./gestationalAgePicker";
import { PregnancyStartDatePicker } from "./pregnancyStartDatePicker";
import { PeakSystolicVelocityInput } from "./peakSystolicVelocityInput";
import { PeakSystolicVelocityMedian } from "./peakSystolicVelocityMedian";
import { MultipleOfMedian } from "./multipleOfMedian";

const Iconography = () => {

    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(PeakSystolicVelocityWidget);
        setWidgetData(PeakSystolicVelocityWidgetData);
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
                <PeakSystolicVelocityInput />
                <PeakSystolicVelocityMedian />
                <MultipleOfMedian />
            </View>
        </View>
    );
};

export default withScrollView(Iconography);