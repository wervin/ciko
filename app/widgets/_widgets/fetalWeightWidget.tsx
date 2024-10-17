import { Widget } from '@/components/widgets';
import { randomUUID } from "expo-crypto";
import { Text, Linking, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import { Calculator } from 'lucide-react-native';
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import PressableOpacity from '@/components/ui/pressableOpacity';

export interface FetalWeightWidgetProps {
    visible: boolean;
    isHeadCircumferenceValid: boolean;
    isAbdominalCircumferenceValid: boolean;
    isFemurLengthValid: boolean;
    gestationalAge?: number;
    headCircumference?: number;
    abdominalCircumference?: number;
    femurLength?: number;
};

export const FetalWeightWidgetData: FetalWeightWidgetProps = {
    visible: false,
    isHeadCircumferenceValid: true,
    isAbdominalCircumferenceValid: true,
    isFemurLengthValid: true,
    gestationalAge: 196,
    headCircumference: 264,
    abdominalCircumference: 240,
    femurLength: 53
};

const FetalWeightWidgetDescription = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            <Text>Ce calculateur permet d'estimer le poids fœtal à partir des mesures échographiques telles que le périmètre crânien, le périmètre abdominal et la longueur fémorale. Ce calculateur se base sur la formule proposée par </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/3881966/')}>Hadlock</Text>
            <Text>. Les courbes de référence pour déterminer le percentile sont basées sur les résultats d'</Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/32086966/')}>Intergrowth-21st</Text>
            <Text> et de l'</Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/28118360/')}>OMS</Text>
        </Text>
    );
};

const StickyButton = () => {
    const widgetData = useWidgetStoreContext<FetalWeightWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext<(data: FetalWeightWidgetProps) => void>((store) => store.setWidgetData);

    const validateInput = () => {
        if (widgetData == null) {
            return;
        }

        const isHeadCircumferenceValid = widgetData.headCircumference ? true : false;
        const isAbdominalCircumferenceValid = widgetData.abdominalCircumference ? true : false;
        const isFemurLengthValid = widgetData.femurLength ? true : false;

        setWidgetData({
            ...widgetData,
            isHeadCircumferenceValid: isHeadCircumferenceValid,
            isAbdominalCircumferenceValid: isAbdominalCircumferenceValid,
            isFemurLengthValid: isFemurLengthValid,
            visible: isHeadCircumferenceValid && isAbdominalCircumferenceValid && isFemurLengthValid
        });
    };

    return (
        <View
            style={{
                backgroundColor: pink.pink5,
                borderTopWidth: 1,
                borderTopColor: pink.pink6,
                height: 80,
                justifyContent: "center",
                alignContent: "center"
            }}
        >
            <PressableOpacity
                style={{
                    borderRadius: 16,
                    backgroundColor: pink.pink7,
                    flexDirection: "row",
                    alignSelf: "center",
                    alignItems: "center",
                    gap: 16,
                    height: 60,
                }}

                onPress={validateInput}
            >
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    paddingLeft: 16
                }}>
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: "700",
                            color: pinkDark.pink7
                        }}
                    >
                        Calculer
                    </Text>
                </View>

                <View style={{
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    height: 60,
                    width: 60,
                    backgroundColor: pinkDark.pink7,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Calculator
                        width={32}
                        height={32}
                        color={pink.pink7}
                    />
                </View>
            </PressableOpacity>
        </View>
    );
};

export const FetalWeightWidget: Widget = {
    id: randomUUID(),
    title: 'EPF',
    subtitle: 'Estimation du Poids Fœtal',
    description: () => <FetalWeightWidgetDescription />,
    footer: () => <StickyButton />,
    page: "/widgets/fetalWeight"
}
