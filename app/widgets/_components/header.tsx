import { View, Text, Pressable, Modal, Keyboard } from "react-native";
import { blackA, pink, pinkA, pinkDark } from "@/utils/colors";
import { X, Info } from 'lucide-react-native';
import { Link } from "expo-router";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { useState } from "react";

export const Header = () => {
    const widget = useWidgetStoreContext((store) => store.widget);
    const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

    return (
        <>
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={descriptionModalVisible}
                onRequestClose={() => setDescriptionModalVisible(false)}
                statusBarTranslucent
            >
                <Pressable
                    onPress={(event) => {
                        if (event.target == event.currentTarget) {
                            setDescriptionModalVisible(false);
                        }
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: blackA.blackA8,
                    }}
                >

                    <View style={{
                        width: "90%",
                        padding: 10,
                        backgroundColor: pink.pink5,
                        borderBottomWidth: 1,
                        borderBottomColor: pink.pink6,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: "700",
                            color: pinkDark.pink7
                        }}>
                            Information
                        </Text>
                        <Pressable
                            style={{
                                width: 30,
                                height: 30,
                                backgroundColor: pink.pink7,
                                borderRadius: 30,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onPress={() => setDescriptionModalVisible(false)}
                        >

                            <X
                                width={20}
                                height={20}
                                color={pinkDark.pink7}
                            />
                        </Pressable>
                    </View>

                    <View style={{
                        width: "90%",
                        backgroundColor: pink.pink4,
                        padding: 10,
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16
                    }}>

                        {widget?.description()}

                    </View>
                </Pressable>
            </Modal>

            <View
                onTouchStart={() => Keyboard.dismiss()}
                style={{
                    width: "100%",
                    height: 80,
                    padding: 10,
                    backgroundColor: pink.pink5,
                    borderBottomWidth: 1,
                    borderBottomColor: pink.pink6,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        borderRadius: 16,
                        padding: 5,
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >

                    <Link
                        href="/"
                        asChild
                        style={{
                            backgroundColor: pink.pink7,
                            borderRadius: 24,
                            padding: 5,
                        }}
                    >
                        <Pressable>
                            <X
                                width={32}
                                height={32}
                                color={pinkDark.pink7}
                            />
                        </Pressable>
                    </Link>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Pressable
                            onPress={() => setDescriptionModalVisible(true)}
                            style={{
                                height: 50,
                                borderRadius: 16,
                                flexDirection: "row",
                                gap: 16,
                                alignItems: "center",
                                backgroundColor: pink.pink7,
                            }}
                        >
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                paddingLeft: 16
                            }}>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontWeight: "700",
                                        color: pinkDark.pink7
                                    }}
                                >
                                    {widget?.title}
                                </Text>
                            </View>

                            <View style={{
                                borderTopRightRadius: 16,
                                borderBottomRightRadius: 16,
                                height: 50,
                                width: 40,
                                backgroundColor: pinkDark.pink7,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Info
                                    width={24}
                                    height={24}
                                    color={pink.pink7}
                                />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    );
};