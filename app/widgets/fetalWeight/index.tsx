import { View } from "react-native";
import { GestationalAge } from "./gestationalAge";
import { useState, useEffect } from "react";
import { AbdominalCircumference } from "./abdominal-circumference";
import { HeadCircumference } from "./head-circumference";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { FetalWeightWidget, FetalWeightWidgetData } from "../_widgets";
import withScrollView from "@/app/widgets/_components/wrapper";

// WHo Intergrowth-21

const FetalWeight = () => {
    const [abdominalCircumference, setAbdominalCircumference] = useState<number | undefined>();
    const [headCircumference, setHeadCircumference] = useState<number | undefined>();

    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(FetalWeightWidget);
        setWidgetData(FetalWeightWidgetData);
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
            <View style={{
                width: "100%",
                padding: 10,
                gap: 10
            }}>
                <GestationalAge />
            </View>
        </View>
    );
};

export default withScrollView(FetalWeight);