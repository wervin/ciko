import { Widget } from '@/components/widgets';
import { Stack } from 'expo-router';
import { randomUUID } from "expo-crypto";
import { Header } from './_components/header';
import { View, Text, Linking } from 'react-native';
import { WidgetStoreProvider } from '@/providers/widgetStoreProvider';
import { blackA, pink, pinkA, pinkDark, pinkDarkA, purple, purpleDark, whiteA } from '@/utils/colors';
import { Footer } from './_components/footer';
import { ExecuteButton } from './_components/executeButton';
import { CrownRumpLengthWidget, FetalWeightWidget } from './_components/widgets';

export const widgets: Widget[] = [
    CrownRumpLengthWidget,
    FetalWeightWidget
];

const WidgetLayout = () => {
    return (
        <View
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <WidgetStoreProvider>
                <Stack
                    screenOptions={{
                        header: () => <Header />,
                        contentStyle: {
                            backgroundColor: "transparent",
                        },
                    }}
                />
                <ExecuteButton />
                <Footer />
            </WidgetStoreProvider>
        </View>
    );
};

export default WidgetLayout;