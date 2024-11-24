import { Widget } from '@/components/widget';
import { randomUUID } from "expo-crypto";
import { Linking, Text, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import EchographyIcon from "@/assets/icons/echo.svg"

export interface IconographyWidgetProps {
    visible: boolean;
};

const IconographyWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            <Text>Cet outil récapitule les iconographies recommandées selon le </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.cfef.org/CNEOF2023.pdf')}>CNEOF 2023</Text>
        </Text>
    );
};

export const IconographyWidgetData: IconographyWidgetProps = {
    visible: false,
};

export const IconographyWidget: Widget = {
    id: randomUUID(),
    title: 'Iconographies Recommandées',
    description: () => <IconographyWidgetDescription />,
    footer: () => <View style={{ borderTopColor: pink.pink6, borderTopWidth: 1 }} />,
    icon: () => <EchographyIcon color={pinkDark.pink7} />,
    page: "/widgets/iconography"
}