import { Widget } from '@/components/widget';
import { Stack } from 'expo-router';
import { Header } from './_components/header';
import { View, Text, Linking } from 'react-native';
import { PregnancyStartDateWidget, FetalGrowthWidget } from './_widgets';
import React, { useEffect } from 'react';
import { WidgetStoreProvider } from '@/providers/widgetStoreProvider';

export const widgets: Widget[] = [
    PregnancyStartDateWidget,
    FetalGrowthWidget
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