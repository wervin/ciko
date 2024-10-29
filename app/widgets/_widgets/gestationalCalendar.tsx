import { Widget } from '@/components/widget';
import { randomUUID } from "expo-crypto";
import { Text, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import GestationalCalendarIcon from "@/assets/images/pregnancy.svg"

export interface GestationalCalendarWidgetProps {
    visible: boolean;
};

const GestationalCalendarWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            TODO
        </Text>
    );
};

export const GestationalCalendarWidgetData: GestationalCalendarWidgetProps = {
    visible: false
};

export const GestationalCalendarWidget: Widget = {
    id: randomUUID(),
    title: 'GC',
    subtitle: 'Calendrier Gestationel',
    description: () => <GestationalCalendarWidgetDescription />,
    footer: () => <View style={{ borderTopColor: pink.pink6, borderTopWidth: 1 }} />,
    icon: () => <GestationalCalendarIcon color={pinkDark.pink7} />,
    page: "/widgets/gestationalCalendar"
}