import { Widget } from '@/components/widget';
import { randomUUID } from "expo-crypto";
import { Text, Linking, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import { ReferenceTableType, ReferenceTables } from '../newbornWeight/referenceTables';
import { SexType, Sex } from '../newbornWeight/sexInput';
import NewbornIcon  from "@/assets/icons/newborn.svg"

export interface NewbornWeightWidgetProps {
    referenceTable: ReferenceTableType;
    sex: SexType;
    isWeightValid: boolean;
    gestationalAge: number;
    weight?: number;
};

export const NewbornWeightWidgetData: NewbornWeightWidgetProps = {
    referenceTable: ReferenceTables.Audipog,
    sex: Sex.Male,
    isWeightValid: false,
    gestationalAge: 294,
    weight: undefined,
};

const NewbornWeightWidgetDescription = () => {
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

export const NewbornWeightWidget: Widget = {
    id: randomUUID(),
    title: 'Poids à la Naissance',
    description: () => <NewbornWeightWidgetDescription />,
    footer: () => <View style={{ borderTopColor: pink.pink6, borderTopWidth: 1 }} />,
    icon: () => <NewbornIcon color={pinkDark.pink7} />,
    page: "/widgets/newbornWeight"
}
