import { Widget } from '@/components/widgets';
import { Stack } from 'expo-router';
import { randomUUID } from "expo-crypto";
import { Header } from './_components/header';
import { View } from 'react-native';
import { pink } from '@/utils/colors';

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
                backgroundColor: pink.pink3
            }}
        >
            <Stack
                screenOptions={{
                    header: (props) => <Header widgets={widgets} props={props} />,
                    contentStyle: {
                        backgroundColor: pink.pink3,
                    }
                }}
            />
        </View>
    );
};

export default WidgetLayout;