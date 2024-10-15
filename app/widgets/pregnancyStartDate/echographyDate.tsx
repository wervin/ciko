import { blackA, pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { View, Text, Pressable, Modal } from "react-native";
import { ChevronDown } from 'lucide-react-native';
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import PressableOpacity from "@/components/ui/pressableOpacity";
import DatePicker from "@/components/ui/dataPicker";

interface EchographyDateProps {
    currentDate: Date,
    setCurrentDate: (date: Date) => void;
};

export const EchographyDate = ({ currentDate, setCurrentDate }: EchographyDateProps) => {

    return (
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
                    fontSize: 24,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Date de l'Echographie
            </Text>

            <DatePicker date={currentDate} setDate={setCurrentDate} />
        </View>
    );
};