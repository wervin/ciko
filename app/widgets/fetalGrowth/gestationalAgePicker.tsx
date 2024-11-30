import { blackA, pink, pinkDark } from "@/utils/colors";
import { Check, ChevronDown, X } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Modal, FlatList, Pressable } from "react-native";
import { FetalGrowthWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import PressableOpacity from "@/components/pressableOpacity";

interface DayModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

interface WeekModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

const ITEM_HEIGHT = 50;

const DayModal = ({ visible, setVisible }: DayModalProps) => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: FetalGrowthWidgetProps) => void>((store) => store.setWidgetData);

    const days = Array.from({ length: 7 }, (_, i) => i);
    const day = widgetData?.gestationalAge ? widgetData.gestationalAge % 7 : 0;
    const week = widgetData?.gestationalAge ? Math.trunc(widgetData.gestationalAge / 7) : 0;

    return (
        <Modal
            transparent={true}
            animationType={"fade"}
            visible={visible}
            onRequestClose={() => setVisible(false)}
            statusBarTranslucent
        >
            <Pressable
                onPress={(event) => {
                    if (event.target == event.currentTarget) {
                        setVisible(false);
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
                    width: "80%",
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
                        fontSize: 22,
                        fontWeight: "700",
                        color: pinkDark.pink7
                    }}>
                        Jour
                    </Text>
                    <PressableOpacity
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: pink.pink7,
                            borderRadius: 30,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => setVisible(false)}
                    >
                        <X
                            width={20}
                            height={20}
                            color={pinkDark.pink7}
                        />
                    </PressableOpacity>
                </View>

                <View style={{
                    width: "80%",
                    maxHeight: "50%",
                    overflow: "hidden",
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    backgroundColor: pink.pink4,
                }}>
                    <FlatList
                        data={days}
                        getItemLayout={(_, index) => ({
                            length: (ITEM_HEIGHT + 1),
                            offset: (ITEM_HEIGHT + 1) * index,
                            index,
                        })}
                        keyExtractor={(item) => item.toString()}
                        alwaysBounceHorizontal={false}
                        alwaysBounceVertical={false}
                        bounces={false}
                        overScrollMode="never"
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={{ backgroundColor: pink.pink5, height: 1 }} />
                        )}
                        renderItem={({ item }) => (
                            <PressableOpacity
                                style={{
                                    height: ITEM_HEIGHT,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 20,
                                    backgroundColor: item === day ? pink.pink5 : pink.pink4
                                }}
                                onPress={() => {
                                    const gestationalAge = week * 7 + item;
                                    setWidgetData({ ...widgetData, gestationalAge: gestationalAge })
                                    setVisible(false);
                                }}
                            >

                                <Text
                                    style={{
                                        color: item === day ? pinkDark.pink7 : pinkDark.pink3,
                                        fontSize: 18,
                                        fontWeight: "700",
                                        textAlignVertical: "center",
                                    }}
                                >
                                    {item}
                                </Text>

                                {item === day && <Check size={18} color={pinkDark.pink7} />}
                            </PressableOpacity>
                        )}
                    />
                </View>
            </Pressable>
        </Modal>
    );
};

const WeekModal = ({ visible, setVisible }: WeekModalProps) => {
    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: FetalGrowthWidgetProps) => void>((store) => store.setWidgetData);

    const weeks = Array.from({ length: 41 }, (_, i) => i + 2);
    const day = widgetData?.gestationalAge ? widgetData.gestationalAge % 7 : 0;
    const week = widgetData?.gestationalAge ? Math.trunc(widgetData.gestationalAge / 7) : 0;

    return (
        <Modal
            transparent={true}
            animationType={"fade"}
            visible={visible}
            onRequestClose={() => setVisible(false)}
            statusBarTranslucent
        >
            <Pressable
                onPress={(event) => {
                    if (event.target == event.currentTarget) {
                        setVisible(false);
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
                    width: "80%",
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
                        fontSize: 22,
                        fontWeight: "700",
                        color: pinkDark.pink7
                    }}>
                        Semaine Aménorrhée
                    </Text>
                    <PressableOpacity
                        style={{
                            width: 30,
                            height: 30,
                            backgroundColor: pink.pink7,
                            borderRadius: 30,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress={() => setVisible(false)}
                    >
                        <X
                            width={20}
                            height={20}
                            color={pinkDark.pink7}
                        />
                    </PressableOpacity>
                </View>

                <View style={{
                    width: "80%",
                    maxHeight: "50%",
                    overflow: "hidden",
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    backgroundColor: pink.pink4,
                }}>
                    <FlatList
                        data={weeks}
                        initialScrollIndex={week > 5 ? week - 5 : 0}
                        getItemLayout={(_, index) => ({
                            length: (ITEM_HEIGHT + 1),
                            offset: (ITEM_HEIGHT + 1) * index,
                            index,
                        })}
                        keyExtractor={(item) => item.toString()}
                        alwaysBounceHorizontal={false}
                        alwaysBounceVertical={false}
                        bounces={false}
                        overScrollMode="never"
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => (
                            <View style={{ backgroundColor: pink.pink5, height: 1 }} />
                        )}
                        renderItem={({ item }) => (
                            <PressableOpacity
                                style={{
                                    height: ITEM_HEIGHT,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 20,
                                    backgroundColor: item === week ? pink.pink5 : pink.pink4
                                }}
                                onPress={() => {
                                    const gestationalAge = item * 7 + day;
                                    setWidgetData({ ...widgetData, gestationalAge: gestationalAge })
                                    setVisible(false);
                                }}
                            >
                                <Text
                                    style={{
                                        color: item === week ? pinkDark.pink7 : pinkDark.pink3,
                                        fontSize: 18,
                                        fontWeight: "700",
                                        textAlignVertical: "center",
                                    }}
                                >
                                    {item}
                                </Text>

                                {item === week && <Check size={18} color={pinkDark.pink7} />}
                            </PressableOpacity>
                        )}
                    />
                </View>
            </Pressable>
        </Modal>
    );
};

export const GestationalAgePicker = () => {
    const [weekModalVisible, setWeekModalVisible] = useState(false);
    const [dayModalVisible, setDayModalVisible] = useState(false);

    const widgetData = useWidgetStoreContext<FetalGrowthWidgetProps>((store) => store.widgetData);

    return (
        <>
            <DayModal visible={dayModalVisible} setVisible={setDayModalVisible} />
            <WeekModal visible={weekModalVisible} setVisible={setWeekModalVisible} />
            <View
                style={{
                    gap: 10,
                    padding: 10,
                    backgroundColor: pink.pink4,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: pink.pink6
                }}
            >
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "700",
                        color: pinkDark.pink3
                    }}
                >
                    Age Gestationnel
                </Text>

                <View
                    style={{
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <PressableOpacity
                        onPress={() => setWeekModalVisible(true)}
                        style={{
                            width: "50%",
                            height: 50,
                            backgroundColor: pink.pink6,
                            borderTopLeftRadius: 16,
                            borderBottomLeftRadius: 16,
                            borderRightWidth: 1,
                            borderRightColor: pinkDark.pink7,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            gap: 10,
                        }}>
                        <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: '700',
                                color: pinkDark.pink7,
                            }}>
                                <Text>{widgetData?.gestationalAge ? Math.trunc(widgetData.gestationalAge / 7) : 0}</Text>
                                <Text> SA</Text>
                            </Text>
                        </View>
                        <ChevronDown size={20} color={pinkDark.pink7} />
                    </PressableOpacity>

                    <PressableOpacity
                        onPress={() => setDayModalVisible(true)}
                        style={{
                            width: "50%",
                            height: 50,
                            backgroundColor: pink.pink6,
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            gap: 10,
                        }}>
                        <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: '700',
                                color: pinkDark.pink7,
                            }}>
                                <Text>{widgetData?.gestationalAge ? widgetData.gestationalAge % 7 : 0}</Text>
                                <Text> J</Text>
                            </Text>
                        </View>
                        <ChevronDown size={20} color={pinkDark.pink7} />
                    </PressableOpacity>
                </View>
            </View>
        </>
    );
};