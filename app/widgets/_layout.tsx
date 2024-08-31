import { Widget } from '@/components/widgets';
import { Stack } from 'expo-router';
import { randomUUID } from "expo-crypto";
import { Header } from './_components/header';
import { View } from 'react-native';
import { pink, purple } from '@/utils/colors';
import { Footer } from './_components/footer';

export const widgets: Widget[] = [
    {
        id: randomUUID(),
        categories: ['DDG', 'LCC', 'Terme', 'Age gestationnel'],
        title: 'Date de Début de Grossesse',
        page: "/widgets/cranioCaudale"
    },
    {
        id: randomUUID(),
        categories: ['EPF', 'Age gestationnel'],
        title: 'Estimation du Poids Fœtal',
        page: "/widgets/poidsFoetal"
    }
];

const WidgetLayout = () => {
    return (
        <View
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Stack
                screenOptions={{
                    header: () => <Header />,
                    contentStyle: {
                        backgroundColor: "transparent",
                    },
                }}
            />
            <Footer />
        </View>
    );
};

export default WidgetLayout;