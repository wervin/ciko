import { Widget } from '@/components/widgets';
import { Stack } from 'expo-router';
import { randomUUID } from "expo-crypto";
import { Header } from './_components/header';
import { View, Text, Linking } from 'react-native';
import { WidgetStoreProvider } from '@/providers/widgetStoreProvider';
import { blackA, pink, pinkA, pinkDark, pinkDarkA, purple, purpleDark, whiteA } from '@/utils/colors';
import { PregnancyStartDateWidget, FetalWeightWidget } from './_widgets';
import React from 'react';

export const widgets: Widget[] = [
    PregnancyStartDateWidget,
    FetalWeightWidget
];

const WidgetLayout = () => {
    return (
        <View
            style={{
                width: "100%",
                height: "100%"
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
            </WidgetStoreProvider>
        </View>
    );
};

export default WidgetLayout;