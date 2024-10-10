import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { Keyboard, View } from "react-native";

export const Footer = () => {
    const widget = useWidgetStoreContext((store) => store.widget);

    return (
        <View onTouchStart={() => Keyboard.dismiss()}>
            {widget?.footer && widget?.footer()}
        </View>
    );
};