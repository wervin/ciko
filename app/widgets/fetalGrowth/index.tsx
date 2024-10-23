import { View } from "react-native";
import { useEffect } from "react";
import { GestationalAgePicker } from "./gestationalAgePicker";
import { HeadCircumferenceInput } from "./headCircumferenceInput";
import { AbdominalCircumferenceInput } from "./abdominalCircumference";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { FetalGrowthWidget, FetalGrowthWidgetData } from "../_widgets";
import withScrollView from "@/app/widgets/_components/wrapper";
import { FemurLengthInput } from "./femurLengthInput";
import { ResultModal } from "./resultModal";
import { ReferenceTableInput } from "./referenceTableInput";
import { BiparietalDiameterInput } from "./biparietalDiameterInput";
import { FetalWeight } from "./fetalWeight";

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
                <HeadCircumferenceInput />
                <AbdominalCircumferenceInput />
                <FemurLengthInput />
                <BiparietalDiameterInput />
                <FetalWeight />
            </View>
        </View>
    );
};

export default withScrollView(FetalGrowth);