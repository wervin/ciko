import { Widget } from '@/components/widget';
import { randomUUID } from "expo-crypto";
import { Text, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import GestationalCalendarIcon from "@/assets/icons/pregnancy.svg"

export interface GestationalCalendarWidgetProps {
    gestationalAge: number;
};

const GestationalCalendarWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            Ce calendrier récapitule les dates clés pour le suivi de la grossesse
        </Text>
    );
};

export const GestationalCalendarWidgetData: GestationalCalendarWidgetProps = {
    gestationalAge: 14,
};

export const GestationalCalendarWidget: Widget = {
    id: randomUUID(),
    title: 'Calendrier Gestationel',
    description: () => <GestationalCalendarWidgetDescription />,
    footer: () => <View style={{ borderTopColor: pink.pink6, borderTopWidth: 1 }} />,
    icon: () => <GestationalCalendarIcon color={pinkDark.pink7} />,
    page: "/widgets/gestationalCalendar"
}