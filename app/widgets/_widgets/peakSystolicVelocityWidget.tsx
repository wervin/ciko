import { Widget } from '@/components/widget';
import { randomUUID } from "expo-crypto";
import { Linking, Text, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import PeakSystolicVelocityIcon from "@/assets/icons/psv.svg"

export interface PeakSystolicVelocityWidgetProps {
    gestationalAge: number;
    peakSystolicVelocity?: number;
};

const PeakSystolicVelocityWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            <Text>Ce calculateur récapitule les informations clés pour le suivi du pic systolique de vélocité de l’artère cérébrale moyenne, aidant à détecter l'anémie fœtale chez les grossesses à risque en raison de l'allo-immunisation maternelle, en se basant sur les travaux de </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/10620643')}>Mari et al.</Text>
        </Text>
    );
};

export const PeakSystolicVelocityWidgetData: PeakSystolicVelocityWidgetProps = {
    gestationalAge: 112,
    peakSystolicVelocity: undefined
};

export const PeakSystolicVelocityWidget: Widget = {
    id: randomUUID(),
    title: "Analyse du Pic Systolique",
    description: () => <PeakSystolicVelocityWidgetDescription />,
    footer: () => <View style={{ borderTopColor: pink.pink6, borderTopWidth: 1 }} />,
    icon: () => <PeakSystolicVelocityIcon color={pinkDark.pink7} />,
    page: "/widgets/peakSystolicVelocity"
}