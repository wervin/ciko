import { blackA, pink, pinkDark } from "@/utils/colors";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Modal, FlatList, Pressable, StyleSheet } from "react-native";

interface GestiationalAgeProps {
    selectedWeek: string;
    setSelectedWeek: (text: string) => void;
    selectedDay: string;
    setSelectedDay: (text: string) => void;
}

export const GestiationalAge = ({
    selectedWeek,
    setSelectedWeek,
    selectedDay,
    setSelectedDay
}: GestiationalAgeProps) => {
    const [weekModalVisible, setWeekModalVisible] = useState(false);
    const weeks = Array.from({ length: 40 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))

    const onWeekChange = (item: { label: string; value: string; }) => {
        setSelectedWeek(item.value);
        setWeekModalVisible(false);
    };

    const [dayModalVisible, setDayModalVisible] = useState(false);
    const days = Array.from({ length: 6 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))

    const onDayChange = (item: { label: string; value: string; }) => {
        setSelectedDay(item.value);
        setDayModalVisible(false);
    };

    return (
        <View
            style={{
                gap: 10
            }}
        >
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={weekModalVisible}
                onRequestClose={() => setWeekModalVisible(false)}
                statusBarTranslucent
            >

                <Pressable
                    onPress={(event) => {
                        if (event.target == event.currentTarget) {
                            setWeekModalVisible(false);
                        }
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View style={{
                        width: 300,
                        maxHeight: 500,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        overflow: "hidden"
                    }}>
                        <FlatList
                            style={{
                                backgroundColor: pink.pink3
                            }}
                            data={weeks}
                            alwaysBounceHorizontal={false}
                            alwaysBounceVertical={false}
                            bounces={false}
                            overScrollMode="never"
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={
                                <View
                                    style={{
                                        width: "100%",
                                        height: 40,
                                        backgroundColor: pink.pink5,
                                        justifyContent: "center",
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.30,
                                        shadowRadius: 4.65,
                                        elevation: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: pinkDark.pink5,
                                            fontSize: 22,
                                            fontWeight: "700",
                                            textAlignVertical: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        Semaine Aménorrhée
                                    </Text>
                                </View>
                            }
                            stickyHeaderIndices={[0]}
                            keyExtractor={(item) => item.value}
                            ItemSeparatorComponent={() => (
                                <View style={{ backgroundColor: pink.pink5, height: 1 }} />
                            )}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingHorizontal: 20,
                                        paddingVertical: 12,
                                        backgroundColor: item.value === selectedWeek ? pink.pink4 : pink.pink3
                                    }}
                                    onPress={() => onWeekChange(item)}
                                >
                                    <Text
                                        style={{
                                            color: pinkDark.pink5,
                                            fontSize: 18,
                                            fontWeight: "700",
                                            textAlignVertical: "center",
                                        }}
                                    >
                                        {item.label}
                                    </Text>

                                    {item.value === selectedWeek && <Check size={18} color={pinkDark.pink5} />}
                                </Pressable>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={dayModalVisible}
                onRequestClose={() => setDayModalVisible(false)}
                statusBarTranslucent
            >

                <Pressable
                    onPress={(event) => {
                        if (event.target == event.currentTarget) {
                            setDayModalVisible(false);
                        }
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View style={{
                        width: 300,
                        maxHeight: 500,
                        backgroundColor: 'white',
                        borderRadius: 8,
                        overflow: "hidden"
                    }}>
                        <FlatList
                            style={{
                                backgroundColor: pink.pink3
                            }}
                            data={days}
                            alwaysBounceHorizontal={false}
                            alwaysBounceVertical={false}
                            bounces={false}
                            overScrollMode="never"
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={
                                <View
                                    style={{
                                        width: "100%",
                                        height: 40,
                                        backgroundColor: pink.pink5,
                                        justifyContent: "center",
                                        shadowOffset: {
                                            width: 0,
                                            height: 4,
                                        },
                                        shadowOpacity: 0.30,
                                        shadowRadius: 4.65,
                                        elevation: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: pinkDark.pink5,
                                            fontSize: 22,
                                            fontWeight: "700",
                                            textAlignVertical: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        Jour
                                    </Text>
                                </View>
                            }
                            stickyHeaderIndices={[0]}
                            keyExtractor={(item) => item.value}
                            ItemSeparatorComponent={() => (
                                <View style={{ backgroundColor: pink.pink5, height: 1 }} />
                            )}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingHorizontal: 20,
                                        paddingVertical: 12,
                                        backgroundColor: item.value === selectedDay ? pink.pink4 : pink.pink3
                                    }}
                                    onPress={() => onDayChange(item)}
                                >
                                    <Text
                                        style={{
                                            color: pinkDark.pink5,
                                            fontSize: 18,
                                            fontWeight: "700",
                                            textAlignVertical: "center",
                                        }}
                                    >
                                        {item.label}
                                    </Text>

                                    {item.value === selectedDay && <Check size={18} color={pinkDark.pink5} />}
                                </Pressable>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "800",
                    color: pinkDark.pink5,
                }}
            >
                Age Gestationnel
            </Text>

            <View
                style={{
                    position: "relative"
                }}
            >
                <View
                    style={{
                        backgroundColor: pink.pink2,
                        borderColor: pink.pink6,
                        borderWidth: 2,
                        borderRadius: 10,
                        height: 60,
                    }}
                />

                <Pressable
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "40%",
                        height: 60,
                        paddingRight: 15,
                        justifyContent: "center"
                    }}
                    onPress={() => setWeekModalVisible(true)}
                >
                    <Text
                        style={{
                            color: pinkDark.pink7,
                            fontSize: 22,
                            fontWeight: "700",
                            textAlignVertical: "center",
                            textAlign: "right",
                        }}
                    >
                        {weeks.find(item => item.value === selectedWeek)?.label || '1'}
                    </Text>
                </Pressable>

                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "45%",
                        height: 60,
                        width: "15%",
                        backgroundColor: pink.pink5,
                        borderColor: pink.pink6,
                        borderWidth: 2,
                        color: pinkDark.pink7,
                        fontSize: 22,
                        fontWeight: "700",
                        textAlignVertical: "center",
                        textAlign: "center",
                    }}
                >
                    SA
                </Text>

                <Pressable
                    style={{
                        position: "absolute",
                        top: 0,
                        right: "15%",
                        height: 60,
                        width: "30%",
                        paddingRight: 15,
                        justifyContent: "center"
                    }}
                    onPress={() => setDayModalVisible(true)}
                >
                    <Text
                        style={{
                            color: pinkDark.pink7,
                            fontSize: 22,
                            fontWeight: "700",
                            textAlignVertical: "center",
                            textAlign: "right",
                        }}
                    >
                        {days.find(item => item.value === selectedDay)?.label || '1'}
                    </Text>
                </Pressable>

                <Text
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: 60,
                        width: "15%",
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        backgroundColor: pink.pink5,
                        borderColor: pink.pink6,
                        borderWidth: 2,
                        color: pinkDark.pink7,
                        fontSize: 22,
                        fontWeight: "700",
                        textAlignVertical: "center",
                        textAlign: "center",
                    }}
                >
                    J
                </Text>
            </View>
        </View>
    );
};