import { View } from "react-native";
import { useEffect } from "react";
import { GestationalAgePicker } from "./gestationalAgePicker";
import { HeadCircumferenceInput } from "./headCircumferenceInput";
import { AbdominalCircumferenceInput } from "./abdominalCircumference";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { FetalGrowthWidget, FetalGrowthWidgetData } from "../_widgets";
import withScrollView from "@/app/widgets/_components/wrapper";
import { FemurLengthInput } from "./femurLengthInput";
import { ReferenceTableInput } from "./referenceTableInput";
import { BiparietalDiameterInput } from "./biparietalDiameterInput";
import { FetalWeight } from "./fetalWeight";
import { PregnancyStartDatePicker } from "./pregnancyStartDatePicker";
import { Term } from "./term";

const FetalGrowth = () => {
    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(FetalGrowthWidget);
        setWidgetData(FetalGrowthWidgetData);
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
                <GestationalAgePicker />
                <PregnancyStartDatePicker />
                <Term />
                <BiparietalDiameterInput />
                <HeadCircumferenceInput />
                <AbdominalCircumferenceInput />
                <FemurLengthInput />
                <FetalWeight />
            </View>
        </View>
    );
};

export default withScrollView(FetalGrowth);