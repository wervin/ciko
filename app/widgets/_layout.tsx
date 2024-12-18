import { Widget } from '@/components/widget';
import { Stack } from 'expo-router';
import { Header } from './_components/header';
import { View } from 'react-native';
import { PregnancyStartDateWidget, FetalGrowthWidget, GestationalCalendarWidget, IconographyWidget, BodyMassIndexWidget, PeakSystolicVelocityWidget } from './_widgets';
import { WidgetStoreProvider } from '@/providers/widgetStoreProvider';

export const widgets: Widget[] = [
    GestationalCalendarWidget,
    FetalGrowthWidget,
    PregnancyStartDateWidget,
    IconographyWidget,
    BodyMassIndexWidget,
    PeakSystolicVelocityWidget
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
                        animation: 'none',
                    }}
                />
            </WidgetStoreProvider>
        </View>
    );
};

export default WidgetLayout;