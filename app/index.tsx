import { ScrollView, View } from "react-native";
import { pink } from "@/utils/colors";
import { WidgetCard } from "./_components/widgetCard";
import { Header } from "./_components/header";
import { widgets } from "./widgets/_layout";

const Home = () => {
    return (
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
            stickyHeaderIndices={[0]}
            stickyHeaderHiddenOnScroll={true}
        >

            <Header />

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
    );
};

export default Home;