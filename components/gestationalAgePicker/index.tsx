import { blackA, pink, pinkDark } from "@/utils/colors";
import { Check, ChevronDown, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { View, Text, Modal, FlatList, Pressable, ScrollView } from "react-native";
import { GestationalCalendarWidgetProps } from "../../app/widgets/_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import PressableOpacity from "@/components/pressableOpacity";
import React from "react";

interface DayModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

interface WeekModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
};

const ITEM_HEIGHT = 50;

const DayModal: React.FC<DayModalProps> = React.memo(({ visible, setVisible }) => {
    const widgetData = useWidgetStoreContext<GestationalCalendarWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: GestationalCalendarWidgetProps) => void>((store) => store.setWidgetData);

    const days = Array.from({ length: 7 }, (_, i) => i);
    const day = widgetData?.gestationalAge ? Math.abs(widgetData.gestationalAge % 7) : 0;
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
                    {days.length &&
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                            bounces={false}
                            alwaysBounceVertical={false}
                            contentContainerStyle={{ paddingVertical: 0 }}
                        >
                            {days.map((item, index) => (
                                <React.Fragment key={item.toString()}>
                                    <PressableOpacity
                                        style={{
                                            height: ITEM_HEIGHT,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 20,
                                            backgroundColor: item === day ? pink.pink5 : pink.pink4,
                                        }}
                                        onPress={() => {
                                            const gestationalAge = week * 7 + item;
                                            setWidgetData({ ...widgetData, gestationalAge });
                                            setVisible(false);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: item === day ? pinkDark.pink7 : pinkDark.pink3,
                                                fontSize: 18,
                                                fontWeight: '700',
                                                textAlignVertical: 'center',
                                            }}
                                        >
                                            {item}
                                        </Text>

                                        {item === day && <Check size={18} color={pinkDark.pink7} />}
                                    </PressableOpacity>

                                    {index < days.length - 1 && (
                                        <View
                                            style={{
                                                backgroundColor: pink.pink5,
                                                height: 1,
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </ScrollView>
                    }
                </View>
            </Pressable>
        </Modal>
    );
});

const WeekModal: React.FC<WeekModalProps> = React.memo(({ visible, setVisible }) => {
    const widgetData = useWidgetStoreContext<GestationalCalendarWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: GestationalCalendarWidgetProps) => void>((store) => store.setWidgetData);

    const weeks = Array.from({ length: 41 }, (_, i) => i + 2);
    const day = widgetData?.gestationalAge ? Math.abs(widgetData.gestationalAge % 7) : 0;
    const week = widgetData?.gestationalAge ? Math.trunc(widgetData.gestationalAge / 7) : 0;

    const scrollViewRef = useRef<ScrollView | null>(null);

    const initialScrollIndex = week > 42 ? 0 : week > 5 ? week - 5 : 0;
    const initialScrollOffset = (ITEM_HEIGHT + 1) * initialScrollIndex;

    const handleContentSizeChange = (contentWidth: number, contentHeight: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: initialScrollOffset, animated: false });
        }
    };

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
                    {weeks.length &&
                        <ScrollView
                            ref={scrollViewRef}
                            onContentSizeChange={handleContentSizeChange}
                            showsVerticalScrollIndicator={false}
                            overScrollMode="never"
                            bounces={false}
                            alwaysBounceVertical={false}
                        >
                            {weeks.map((item, index) => (
                                <React.Fragment key={item.toString()}>
                                    <PressableOpacity
                                        style={{
                                            height: ITEM_HEIGHT,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 20,
                                            backgroundColor: item === week ? pink.pink5 : pink.pink4,
                                        }}
                                        onPress={() => {
                                            const gestationalAge = item * 7 + day;
                                            setWidgetData({ ...widgetData, gestationalAge });
                                            setVisible(false);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: item === week ? pinkDark.pink7 : pinkDark.pink3,
                                                fontSize: 18,
                                                fontWeight: '700',
                                                textAlignVertical: 'center',
                                            }}
                                        >
                                            {item}
                                        </Text>

                                        {item === week && <Check size={18} color={pinkDark.pink7} />}
                                    </PressableOpacity>

                                    {index < weeks.length - 1 && (
                                        <View
                                            style={{
                                                backgroundColor: pink.pink5,
                                                height: 1,
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </ScrollView>
                    }
                </View>
            </Pressable>
        </Modal>
    );
});

export const GestationalAgePicker = () => {
    const [weekModalVisible, setWeekModalVisible] = useState(false);
    const [dayModalVisible, setDayModalVisible] = useState(false);

    const widgetData = useWidgetStoreContext<GestationalCalendarWidgetProps>((store) => store.widgetData);

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
                                <Text>{widgetData?.gestationalAge ? Math.abs(widgetData.gestationalAge % 7) : 0}</Text>
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