import { Widget } from '@/components/widgets';
import { randomUUID } from "expo-crypto";
import { Text, Linking, View } from 'react-native';
import { blackA, pink, pinkA, pinkDark, pinkDarkA, purple, purpleDark, whiteA } from '@/utils/colors';

export const FetalWeightWidget: Widget = {
    id: randomUUID(),
    title: 'EPF',
    subtitle: 'Estimation du Poids Fœtal',
    description: () => <View />,
    page: "/widgets/fetalWeight"
}
