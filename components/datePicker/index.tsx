import { blackA, pink, pinkDark } from '@/utils/colors';
import { Check, ChevronDown, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, TouchableOpacity } from 'react-native';
import PressableOpacity from '../pressableOpacity';

const ITEM_HEIGHT = 50;

interface DatePickerProps {
    date: Date;
    setDate: (date: Date) => void;
};

const DatePicker = ({ date, setDate }: DatePickerProps) => {
    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [monthModalVisible, setMonthModalVisible] = useState(false);
    const [yearModalVisible, setYearModalVisible] = useState(false);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - 50 + i);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthName = months[monthIndex];

    return (
        <View
            style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
        >
            {/* Day Picker */}
            <PressableOpacity
                onPress={() => setDayModalVisible(true)}
                style={{
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
                    gap: 5,
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: pinkDark.pink7,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>
                    {day}
                </Text>

                <ChevronDown size={20} color={pinkDark.pink7} />
            </PressableOpacity>

            {/* Day Modal */}
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
                            onPress={() => setDayModalVisible(false)}
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
                            initialScrollIndex={day > 4 ? day - 4 : 0}
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
                                        const newDate = new Date(date);
                                        newDate.setDate(item);
                                        setDate(newDate);
                                        setDayModalVisible(false);
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

            {/* Month Picker */}
            <PressableOpacity
                onPress={() => setMonthModalVisible(true)}
                style={{
                    flex: 1,
                    height: 50,
                    backgroundColor: pink.pink6,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: pinkDark.pink7,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>
                    {monthName}
                </Text>

                <ChevronDown size={20} color={pinkDark.pink7} />
            </PressableOpacity>

            {/* Month Modal */}
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={monthModalVisible}
                onRequestClose={() => setMonthModalVisible(false)}
                statusBarTranslucent
            >
                <Pressable
                    onPress={(event) => {
                        if (event.target == event.currentTarget) {
                            setMonthModalVisible(false);
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
                            Mois
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
                            onPress={() => setMonthModalVisible(false)}
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
                            data={months}
                            initialScrollIndex={(() => {
                                return monthIndex > 3 ? monthIndex - 3 : 0;
                            })()}
                            getItemLayout={(_, index) => ({
                                length: (ITEM_HEIGHT + 1),
                                offset: (ITEM_HEIGHT + 1) * index,
                                index,
                            })}
                            keyExtractor={(item) => item}
                            alwaysBounceHorizontal={false}
                            alwaysBounceVertical={false}
                            bounces={false}
                            overScrollMode="never"
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => (
                                <View style={{ backgroundColor: pink.pink5, height: 1 }} />
                            )}
                            renderItem={({ item, index }) => (
                                <PressableOpacity
                                    style={{
                                        height: ITEM_HEIGHT,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingHorizontal: 20,
                                        backgroundColor: item === monthName ? pink.pink5 : pink.pink4
                                    }}
                                    onPress={() => {
                                        const newDate = new Date(date);
                                        newDate.setMonth(index);
                                        setDate(newDate);
                                        setMonthModalVisible(false);
                                    }}
                                >

                                    <Text
                                        style={{
                                            color: item === monthName ? pinkDark.pink7 : pinkDark.pink3,
                                            fontSize: 18,
                                            fontWeight: "700",
                                            textAlignVertical: "center",
                                        }}
                                    >
                                        {item}
                                    </Text>

                                    {item === monthName && <Check size={18} color={pinkDark.pink7} />}
                                </PressableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>

            {/* Year Picker */}
            <PressableOpacity
                onPress={() => setYearModalVisible(true)}
                style={{
                    height: 50,
                    backgroundColor: pink.pink6,
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    borderLeftWidth: 1,
                    borderLeftColor: pinkDark.pink7,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    gap: 5,
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '700',
                        color: pinkDark.pink7,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    }}>
                    {year}
                </Text>

                <ChevronDown size={20} color={pinkDark.pink7} />
            </PressableOpacity>

            {/* Year Modal */}
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={yearModalVisible}
                onRequestClose={() => setYearModalVisible(false)}
                statusBarTranslucent
            >
                <Pressable
                    onPress={(event) => {
                        if (event.target == event.currentTarget) {
                            setYearModalVisible(false);
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
                            Année
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
                            onPress={() => setYearModalVisible(false)}
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
                            data={years}
                            initialScrollIndex={year > (currentYear - 47) ? year - (currentYear - 47) : 0}
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
                                        backgroundColor: item === year ? pink.pink5 : pink.pink4
                                    }}
                                    onPress={() => {
                                        const newDate = new Date(date);
                                        newDate.setFullYear(item);
                                        setDate(newDate);
                                        setYearModalVisible(false);
                                    }}
                                >

                                    <Text
                                        style={{
                                            color: item === year ? pinkDark.pink7 : pinkDark.pink3,
                                            fontSize: 18,
                                            fontWeight: "700",
                                            textAlignVertical: "center",
                                        }}
                                    >
                                        {item}
                                    </Text>

                                    {item === year && <Check size={18} color={pinkDark.pink7} />}
                                </PressableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View >
    );
};

export default DatePicker;
