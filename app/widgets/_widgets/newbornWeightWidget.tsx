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
    referenceTable: ReferenceTables.Intergrowth,
    sex: Sex.Male,
    isWeightValid: false,
    gestationalAge: 294,
    weight: undefined,
};

const NewbornWeightWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            <Text>Ce calculateur permet déterminer les percentiles du poids à la naissance. </Text>
            <Text>Les courbes de référence pour déterminer les percentiles sont basées sur les résultats d'</Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/25209487/')}>Intergrowth-21st</Text>
            <Text>. Les courbes de référence d'Audipog ne sont pas disponibles pour le moment</Text>
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
