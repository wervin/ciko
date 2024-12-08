import { Widget } from '@/components/widget';
import { randomUUID } from "expo-crypto";
import { Text, Linking, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import { GestationalAgeCurveType, GestationalAgeCurves } from '../pregnancyStartDate/gestationalAgeCurve';
import PregnancyStartDateIcon from "@/assets/icons/ddg.svg"

export interface PregnancyStartDateWidgetProps {
    isValid: boolean;
    isPresent: boolean;
    gestationalAgeCurve: GestationalAgeCurveType;
    crownRumpLength?: number;
    echographyDate: Date;
};

const PregnancyStartDateWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            <Text>Ce calculateur permet d'estimer la date de début de grossesse ainsi que l'âge gestationnel à partir de la longueur crânio-caudale mesurée lors de l'échographie. Ce calculateur se base sur les formules proposées par l'</Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4286014/')}>Intergrowth-21st</Text>
            <Text> et par </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/1182090/')}>Robinson</Text>
        </Text>
    );
};

export const PregnancyStartDateWidgetData: PregnancyStartDateWidgetProps = {
    isValid: true,
    isPresent: false,
    gestationalAgeCurve: GestationalAgeCurves.Intergrowth,
    crownRumpLength: undefined,
    echographyDate: new Date()
};

export const PregnancyStartDateWidget: Widget = {
    id: randomUUID(),

    title: 'Datation',
    description: () => <PregnancyStartDateWidgetDescription />,
    footer: () => <View style={{ borderTopColor: pink.pink6, borderTopWidth: 1 }} />,
    icon: () => <PregnancyStartDateIcon color={pinkDark.pink7} />,
    page: "/widgets/pregnancyStartDate"
}