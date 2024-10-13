import { useState, useEffect } from "react";
import { View } from "react-native";
import { EchographyDate } from "./echographyDate";
import { CrownRumpLengthInput } from "./crownRumpLengthInput";
import withScrollView from "@/app/widgets/_components/wrapper";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { PregnancyStartDateWidget, PregnancyStartDateWidgetData } from "../_components/widgets";
import { CrownRumpLengthModal } from "./crownRumpLengthModal";

const PregnancyStartDatePage = () => {
    const [echographyDate, setEchographyDate] = useState(new Date());

    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(PregnancyStartDateWidget);
        setWidgetData(PregnancyStartDateWidgetData);
    }, []);

    return (
        <>
            <CrownRumpLengthModal echographyDate={echographyDate} />
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
                    <EchographyDate currentDate={echographyDate} setCurrentDate={setEchographyDate} />

                    <CrownRumpLengthInput />
                </View>
            </View >
        </>
    );
};

export default withScrollView(PregnancyStartDatePage);