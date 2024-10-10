import { useState, useEffect } from "react";
import { Pressable, View, Text, Modal } from "react-native";
import { EchographyDate } from "./echographyDate";
import { CrownRumpLengthInput, GestationalAgeCurves } from "./crownRumpLengthInput";
import { GestiationalAge } from "./gestiationalAge";
import { PregnancyStartDate } from "./pregnancyStartDate";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import withScrollView from "@/app/widgets/_components/wrapper";
import { Term } from "./term";
import { blackA, pink, pinkDark } from "@/utils/colors";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { CrownRumpLengthWidget, CrownRumpLengthWidgetData, CrownRumpLengthWidgetProps } from "../_components/widgets";
import { CrownRumpLengthModal } from "./crownRumpLengthModal";

const CrownRumpLength = () => {
    const [echographyDate, setEchographyDate] = useState(new Date());

    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(CrownRumpLengthWidget);
        setWidgetData(CrownRumpLengthWidgetData);
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

export default withScrollView(CrownRumpLength);