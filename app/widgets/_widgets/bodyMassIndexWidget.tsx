import { Widget } from '@/components/widget';
import { randomUUID } from "expo-crypto";
import { Text, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import BodyMassIndexIcon from "@/assets/icons/imc.svg"

export interface BodyMassIndexWidgetProps {
    dummy: boolean;
};

const BodyMassIndexWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            Ce calculateur permet de déterminer l'indice de masse corporelle (IMC)
        </Text>
    );
};

export const BodyMassIndexWidgetData: BodyMassIndexWidgetProps = {
    dummy: false,
};

export const BodyMassIndexWidget: Widget = {
    id: randomUUID(),
    title: 'Indice de masse corporelle',
    description: () => <BodyMassIndexWidgetDescription />,
    footer: () => <View style={{ borderTopColor: pink.pink6, borderTopWidth: 1 }} />,
    icon: () => <BodyMassIndexIcon color={pinkDark.pink7} />,
    page: "/widgets/bodyMassIndex"
}