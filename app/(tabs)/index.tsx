import { View } from "react-native";
import { WidgetCard } from "../_components/widgetCard";
import { widgets } from "../widgets/_layout";
import withScrollView from '../_components/wrapper';

const Home = () => {
    return (
        <View
            style={{
                gap: 10,
                padding: 10,
            }}
        >
            {
                widgets.map((widget) =>
                    <WidgetCard key={widget.id} {...widget} />
                )
            }
        </View>
    );
};

export default withScrollView(Home);