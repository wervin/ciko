import { blackA, pink, pinkDark } from '@/utils/colors';
import { Check, ChevronDown, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, Pressable, Modal, FlatList, TouchableOpacity } from 'react-native';
import PressableOpacity from '../pressableOpacity';
import { DropDownButton } from '../dropDownButton';

const ITEM_HEIGHT = 50;

interface DatePickerProps {
    date: Date;
    setDate: (date: Date) => void;
};

const DatePicker = ({ date, setDate }: DatePickerProps) => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthName = months[monthIndex];

    const dayInitialScrollIndex = day > 4 ? day - 4 : 0;
    const monthInitialScrollIndex = monthIndex > 3 ? monthIndex - 3 : 0;
    const yearInitialScrollIndex = year > (currentYear - 2) ? year - (currentYear - 2) : 0;

    const dayOnPress = (item: number) => {
        const newDate = new Date(date);
        newDate.setDate(item);
        setDate(newDate);
    };

    const monthOnPress = (item: string, index: number) => {
        const newDate = new Date(date);
        newDate.setMonth(index);
        setDate(newDate);
    };

    const yearOnPress = (item: number) => {
        const newDate = new Date(date);
        newDate.setFullYear(item);
        setDate(newDate);
    };

    return (
        <View
            style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                overflow: "hidden",
                borderRadius: 16
            }}
        >
            <DropDownButton<number>
                current={day}
                data={days}
                initialScrollIndex={dayInitialScrollIndex}
                buttonLabel={day.toString()}
                modalLabel={"Jour"}
                onPress={dayOnPress}
                style={{
                    width: "20%",
                }}
            />

            <View style={{ backgroundColor: pinkDark.pink7, width: 1, height: "100%" }} />

            <DropDownButton<string>
                current={monthName}
                data={months}
                initialScrollIndex={monthInitialScrollIndex}
                buttonLabel={monthName}
                modalLabel={"Mois"}
                onPress={monthOnPress}
                style={{
                    flex: 1,
                }}
            />

            <View style={{ backgroundColor: pinkDark.pink7, width: 1, height: "100%" }} />

            <DropDownButton<number>
                current={year}
                data={years}
                initialScrollIndex={yearInitialScrollIndex}
                buttonLabel={year.toString()}
                modalLabel={"Année"}
                onPress={yearOnPress}
                style={{
                    width: "30%",
                }}
            />

        </View >
    );
};

export default DatePicker;
