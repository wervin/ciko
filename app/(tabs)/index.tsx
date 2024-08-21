import { ScrollView, View } from "react-native";
import { pink, purple } from "@/utils/colors";
import { WidgetCard } from "../_components/widgetCard";
import { widgets } from "../widgets/_layout";
import { Footer } from "../_components/footer";

const Home = () => {
    return (
        <View
            style={{
                width: "100%",
                height: "100%"
            }}
        >
            <ScrollView
                style={{
                    backgroundColor: pink.pink3,
                    height: "100%",
                    width: "100%",
                }}
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                bounces={false}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
            >

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

            </ScrollView>

        </View>

    );
};

export default Home;