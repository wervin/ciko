import { Widget } from '@/components/widgets';
import { randomUUID } from "expo-crypto";
import { Text, Linking } from 'react-native';
import { pinkDark } from '@/utils/colors';

const GestationCalculatorText = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            <Text>Ce calculateur permet d'estimer la date de début de grossesse ainsi que l'âge gestationnel à partir de la longueur crânio-caudale mesurée lors de l'échographie. Ce calculateur se base sur les courbes de référence proposées par </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4286014/')}>Intergrowth-21st</Text>
            <Text> et par </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/1182090/')}>Robinson</Text>
        </Text>
    );
};

export const CrownRumpLengthWidget: Widget = {
    id: randomUUID(),
    title: 'DDG',
    subtitle: 'Date de Début de Grossesse',
    description: () => <GestationCalculatorText />,
    page: "/widgets/crownRumpLength"
}