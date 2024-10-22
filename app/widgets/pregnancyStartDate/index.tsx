import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { EchographyDate } from "./echographyDate";
import { CrownRumpLengthInput } from "./crownRumpLengthInput";
import withScrollView from "@/app/widgets/_components/wrapper";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { PregnancyStartDateWidget, PregnancyStartDateWidgetData } from "../_widgets";
import { GestationalAge } from "./gestationalAge";
import { PregnancyStartDate } from "./pregnancyStartDate";
import { Term } from "./term";
import { GestationalAgeCurveInput } from "./gestationalAgeCurveInput";

const PregnancyStartDatePage = () => {
    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(PregnancyStartDateWidget);
        setWidgetData(PregnancyStartDateWidgetData);
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
                <GestationalAgeCurveInput />
                
                <EchographyDate />

                <CrownRumpLengthInput />

                <GestationalAge />

                <PregnancyStartDate />

                <Term />
            </View>
        </View >
    );
};

export default withScrollView(PregnancyStartDatePage);