import { pinkDark, pink, purpleDark, purple, violet, violetDark } from '@/utils/colors';
import { View, Text, Pressable, Linking, Alert, Platform } from 'react-native';
import { HandCoins, HandHeart, Info, Bug, CircleUser, LucideIcon } from 'lucide-react-native';
import { ComponentType } from 'react';
import withScrollView from '../_components/wrapper';
import { Shadow } from 'react-native-shadow-2';
import PressableOpacity from '@/components/pressableOpacity';

// Ciko offre un accès rapide à un ensemble d'outils d'obstétrique pour les professionnels de la santé.

interface AboutCardProps {
    label: string;
    components: ComponentType[];
};

interface AboutViewProps {
    label: string;
    Icon: LucideIcon;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
};

interface AboutButtonProps {
    label: string;
    onPress: () => void;
    Icon: LucideIcon;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
};

const Version = () => {
    return (
        <AboutView label={"v1.0.0"} Icon={Info} primaryColor={pink.pink5} secondaryColor={pink.pink7} textColor={pinkDark.pink7} />
    );
};

const Contact = () => {
    const url = "https://wervin.dev";
    const onPress = () => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
        });
    };
    return (
        <AboutButton label={"wervin.dev"} onPress={onPress} Icon={CircleUser} primaryColor={pink.pink6} secondaryColor={pink.pink7} textColor={pinkDark.pink7} />
    );
};

const Report = () => {
    const url = "https://github.com/wervin/ciko/issues";
    const onPress = () => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
        });
    };
    return (
        <AboutButton label={"Signaler un problème"} onPress={onPress} Icon={Bug} primaryColor={pink.pink6} secondaryColor={pink.pink7} textColor={pinkDark.pink7} />
    );
};
const Rate = () => {
    const url = Platform.select({
        ios: 'itms-apps://itunes.apple.com/app/idYOUR_APP_ID',
        android: 'market://details?id=com.einnovation.temu',
    });
    const onPress = () => {
        if (url) {
            Linking.canOpenURL(url).then(supported => {
                if (supported) {
                    Linking.openURL(url);
                }
            });
        }
    };
    return (
        <AboutButton label={"Noter Ciko"} onPress={onPress} Icon={HandHeart} primaryColor={pink.pink6} secondaryColor={pink.pink7} textColor={pinkDark.pink7} />
    );
};

const AboutButton = ({ label, onPress, Icon, primaryColor, secondaryColor, textColor }: AboutButtonProps) => {
    return (

        <PressableOpacity
            onPress={onPress}
            style={{
                height: 50,
                borderRadius: 16,
                backgroundColor: primaryColor,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <View style={{ flex: 1, paddingLeft: 16 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "600",
                        color: textColor,
                        textAlignVertical: "center"
                    }}
                >
                    {label}
                </Text>
            </View>

            <View style={{
                backgroundColor: secondaryColor,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                height: 50,
                width: 50
            }}
            >
                <Icon size={28} color={textColor} />
            </View>

        </PressableOpacity>
    );
};

const AboutView = ({ label, Icon, primaryColor, secondaryColor, textColor }: AboutViewProps) => {
    return (

        <View
            style={{
                height: 50,
                borderRadius: 16,
                backgroundColor: primaryColor,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between"
            }}
        >
            <View style={{ flex: 1, paddingLeft: 16 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "600",
                        color: textColor,
                        textAlignVertical: "center"
                    }}
                >
                    {label}
                </Text>
            </View>

            <View style={{
                backgroundColor: secondaryColor,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                height: 50,
                width: 50
            }}
            >
                <Icon size={28} color={textColor} />
            </View>

        </View>
    );
};

const AboutCard = ({ label, components }: AboutCardProps) => {
    return (
        <View
            style={{
                gap: 10,
                padding: 10,
                backgroundColor: pink.pink4,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: pink.pink6
            }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                {label}
            </Text>

            {components.map((Component, index) => (
                <Component key={index} />
            ))}
        </View>
    );
};

const About = () => {
    return (
        <View
            style={{
                gap: 10,
                padding: 10,
            }}
        >
            <AboutCard label="Version" components={[Version]} />
        </View>
    );
}

export default withScrollView(About);