import { View, Text, Pressable } from "react-native";
import { pink, pinkDark } from "@/utils/colors";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { CircleChevronLeft } from 'lucide-react-native';
import { Link } from "expo-router";
import { Widget } from "@/components/widgets";
import { Shadow } from "react-native-shadow-2";

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

export const Header = () => {
    return (
        <Shadow
            distance={6}
            corners={{ topStart: false, topEnd: false, bottomStart: true, bottomEnd: true }}
        >
            <View
                style={{
                    width: "100%",
                    height: 80,
                    backgroundColor: pink.pink5,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        height: "100%",
                        gap: 20,
                        paddingHorizontal: 10,
                        alignItems: "center",
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
                            padding: 0,
                            fontSize: 28,
                            fontWeight: "600",
                            color: pinkDark.pink3,
                        }}
                    >
                        {/* {getTitleByPagePath(widgets, props.route.name)} */}
                        Test Header
                    </Text>
                </View>
            </View>
        </Shadow>
    );
};