import { View } from "react-native";
import { useEffect } from "react";
import { GestationalAgePicker } from "./gestationalAgePicker";
import { HeadCircumferenceInput } from "./headCircumferenceInput";
import { AbdominalCircumferenceInput } from "./abdominalCircumference";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { FetalWeightWidget, FetalWeightWidgetData } from "../_widgets";
import withScrollView from "@/app/widgets/_components/wrapper";
import { FemurLengthInput } from "./femurLengthInput";

const FetalWeight = () => {
    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(FetalWeightWidget);
        setWidgetData(FetalWeightWidgetData);
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
                <HeadCircumferenceInput />
                <AbdominalCircumferenceInput />
                <FemurLengthInput />
            </View>
        </View>
    );
};

export default withScrollView(FetalWeight);