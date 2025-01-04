import { View } from "react-native";
import { useEffect } from "react";
import { GestationalAgePicker } from "./gestationalAgePicker";
import { WeightInput } from "./weightInput";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { NewbornWeightWidget, NewbornWeightWidgetData } from "../_widgets";
import withScrollView from "@/app/widgets/_components/wrapper";
import { ReferenceTableInput } from "./referenceTableInput";
import { PregnancyStartDatePicker } from "./pregnancyStartDatePicker"
import { SexInput } from "./sexInput"

const NewbornWeight = () => {
    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(NewbornWeightWidget);
        setWidgetData(NewbornWeightWidgetData);
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
                <ReferenceTableInput />
                <SexInput />
                <GestationalAgePicker />
                <PregnancyStartDatePicker />
                <WeightInput />
            </View>
        </View>
    );
};

export default withScrollView(NewbornWeight);