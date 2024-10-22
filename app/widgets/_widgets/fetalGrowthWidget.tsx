import { Widget } from '@/components/widgets';
import { randomUUID } from "expo-crypto";
import { Text, Linking, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import { ReferenceTableType, ReferenceTables } from '../fetalGrowth/referenceTables';

export interface FetalGrowthWidgetProps {
    visible: boolean;
    referenceTable: ReferenceTableType;
    isHeadCircumferenceValid: boolean;
    isAbdominalCircumferenceValid: boolean;
    isFemurLengthValid: boolean;
    gestationalAge: number;
    headCircumference?: number;
    abdominalCircumference?: number;
    femurLength?: number;
};

export const FetalGrowthWidgetData: FetalGrowthWidgetProps = {
    visible: false,
    referenceTable: ReferenceTables.Intergrowth,
    isHeadCircumferenceValid: false,
    isAbdominalCircumferenceValid: false,
    isFemurLengthValid: false,
    gestationalAge: 98,
    headCircumference: undefined,
    abdominalCircumference: 240,
    femurLength: 53
};

const FetalGrowthWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            <Text>Ce calculateur permet déterminer les percentiles des biométries fœtales et d'estimer le poids fœtal à partir des mesures échographiques telles que le périmètre crânien, le périmètre abdominal et la longueur fémorale. Ce calculateur se base sur la formule proposée par </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/3881966/')}>Hadlock</Text>
            <Text>. Les courbes de référence pour déterminer les percentiles sont basées sur les résultats d'</Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/32086966/')}>Intergrowth-21st</Text>
            <Text> et de l'</Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/28118360/')}>OMS</Text>
        </Text>
    );
};

export const FetalGrowthWidget: Widget = {
    id: randomUUID(),
    title: 'CF',
    subtitle: 'Croissance Fœtale',
    description: () => <FetalGrowthWidgetDescription />,
    footer: () => <View style={{ borderTopColor: pink.pink6, borderTopWidth: 1 }} />,
    page: "/widgets/fetalGrowth"
}
