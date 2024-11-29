import { View } from "react-native";
import withScrollView from "../_components/wrapper";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { useEffect } from "react";
import { BodyMassIndexWidget, BodyMassIndexWidgetData } from "../_widgets";
import { WeightInput } from "./weightInput";
import { SizeInput } from "./sizeInput";
import { BodyMassIndex } from "./bodyMassIndex";

const BodyMassIndexView = () => {

    const widget = useWidgetStoreContext((store) => store.widget);
    const setWidget = useWidgetStoreContext((store) => store.setWidget);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    useEffect(() => {
        setWidget(BodyMassIndexWidget);
        setWidgetData(BodyMassIndexWidgetData);
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
                <WeightInput />
                <SizeInput />
                <BodyMassIndex />
            </View>
        </View>
    );
};

export default withScrollView(BodyMassIndexView);