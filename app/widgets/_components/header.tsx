import { View, Text, Pressable } from "react-native";
import { pink, pinkDark } from "@/utils/colors";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { CircleChevronLeft } from 'lucide-react-native';
import { Link } from "expo-router";
import { Widget } from "@/components/widgets";

function getTitleByPagePath(widgets: Widget[], pagePath: string) {
    const widget = widgets.find(widget => {
        const widgetPagePath = widget.page.split('/').pop();
        return widgetPagePath === pagePath.split('/')[0];
    });
    return widget ? widget.title : null;
}

interface HeaderProps {
    widgets: Widget[];
    props: NativeStackHeaderProps
};

export const Header = ({widgets, props} : HeaderProps) => {
    return (
        <View>
            <View
                style={{
                    width: "100%",
                    height: 100,
                    backgroundColor: pink.pink5,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.30,
                    shadowRadius: 4.65,
                    elevation: 5,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                        gap: 20,
                        padding: 10,
                        alignItems: "center"
                    }}
                >

                    <Link
                        href="/"
                        asChild
                    >
                        <Pressable>
                            <CircleChevronLeft
                                width={48}
                                height={48}
                                color={pinkDark.pink3}
                            />
                        </Pressable>
                    </Link>

                    <Text
                        style={{
                            flex: 1,
                            lineHeight: 36,
                            padding: 0,
                            fontSize: 36,
                            fontWeight: "600",
                            color: pinkDark.pink3,
                        }}
                    >
                        {getTitleByPagePath(widgets, props.route.name)}
                    </Text>
                </View>
            </View>
        </View>
    );
};