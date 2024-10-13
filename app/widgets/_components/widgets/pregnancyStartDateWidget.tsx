import { Widget } from '@/components/widgets';
import { randomUUID } from "expo-crypto";
import { Text, Linking, Pressable, View } from 'react-native';
import { pink, pinkDark } from '@/utils/colors';
import { Calculator } from 'lucide-react-native';
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import PressableOpacity from '@/components/ui/pressableOpacity';

export interface PregnancyStartDateWidgetProps {
    visible: boolean;
    isValid: boolean;
    crownRumpLength?: number;
};

const GestationCalculatorText = () => {
    return (
        <Text style={{ fontSize: 18, color: pinkDark.pink3 }}>
            <Text>Ce calculateur permet d'estimer la date de début de grossesse ainsi que l'âge gestationnel à partir de la longueur crânio-caudale mesurée lors de l'échographie. Ce calculateur se base sur les courbes de référence proposées par </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4286014/')}>Intergrowth-21st</Text>
            <Text> et </Text>
            <Text style={{ fontWeight: "700", color: pinkDark.pink7, textDecorationLine: 'underline' }} onPress={() => Linking.openURL('https://pubmed.ncbi.nlm.nih.gov/1182090/')}>Robinson</Text>
        </Text>
    );
};

const StickyButton = () => {
    const widgetData = useWidgetStoreContext<PregnancyStartDateWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    const validateInput = () => {
        if (widgetData == null) {
            return;
        }

        if (widgetData.crownRumpLength == null) {
            setWidgetData({ ...widgetData, isValid: false });
            return;
        }

        if (widgetData.crownRumpLength < 15 || 95 < widgetData.crownRumpLength) {
            setWidgetData({ ...widgetData, isValid: false });
            return;
        }

        setWidgetData({ ...widgetData, visible: true, isValid: true });
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
                            fontSize: 32,
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

export const PregnancyStartDateWidgetData: PregnancyStartDateWidgetProps = {
    visible: false,
    isValid: true,
    crownRumpLength: undefined
};

export const PregnancyStartDateWidget: Widget = {
    id: randomUUID(),
    title: 'DDG',
    subtitle: 'Date de Début de Grossesse',
    description: () => <GestationCalculatorText />,
    footer: () => <StickyButton />,
    page: "/widgets/pregnancyStartDate"
}