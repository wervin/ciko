import { pinkDark, pink, purpleDark, purple, violet, violetDark } from '@/utils/colors';
import { View, Text, Pressable } from 'react-native';
import { HandCoins, HandHeart, Info, Bug, CircleUser, LucideIcon } from 'lucide-react-native';
import { ComponentType } from 'react';
import withScrollView from '../_components/wrapper';
import { Shadow } from 'react-native-shadow-2';

// Ciko offre un accès rapide à un ensemble d'outils d'obstétrique pour les professionnels de la santé.

interface AboutCardProps {
    label: string;
    components: ComponentType[];
};

interface AboutButtonProps {
    label: string;
    Icon: LucideIcon;
    foregroundColor: string;
    backgroundColor: string;
};

const Version = () => {
    return (
        <AboutButton label={"v1.0.0"} Icon={Info} foregroundColor={pinkDark.pink7} backgroundColor={pink.pink7} />
    );
};

const Contact = () => {
    return (
        <AboutButton label={"wervin.dev"} Icon={CircleUser} foregroundColor={pinkDark.pink7} backgroundColor={pink.pink7} />
    );
};

const Report = () => {
    // https://github.com/wervin/ciko/issues
    return (
        <AboutButton label={"Signaler un problème"} Icon={Bug} foregroundColor={violetDark.violet7} backgroundColor={violet.violet7} />
    );
};
const Rate = () => {
    return (
        <AboutButton label={"Noter Ciko"} Icon={HandHeart} foregroundColor={pinkDark.pink7} backgroundColor={pink.pink7} />
    );
};

const Donate = () => {
    return (
        <AboutButton label={"Soutenir Ciko"} Icon={HandCoins} foregroundColor={purpleDark.purple7} backgroundColor={purple.purple7} />
    );
};

const AboutButton = ({ label, Icon, foregroundColor, backgroundColor }: AboutButtonProps) => {
    return (

        <Pressable
            style={{
                backgroundColor: backgroundColor,
                height: 50,
                borderRadius: 16,
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
                        color: foregroundColor,
                        textAlignVertical: "center"
                    }}
                >
                    {label}
                </Text>
            </View>

            <View style={{
                backgroundColor: foregroundColor,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                height: 50,
                width: 50
            }}
            >
                <Icon size={28} color={backgroundColor} />
            </View>

        </Pressable>
    );
};

const AboutCard = ({ label, components }: AboutCardProps) => {
    return (
        <View style={{
            width: "100%",
            gap: 10,
            padding: 10,
            backgroundColor: pink.pink4,
            borderWidth: 1,
            borderColor: pink.pink6,
            borderRadius: 16
        }}
        >
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "800",
                    color: pinkDark.pink5
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
            <AboutCard label="Contact" components={[Contact]} />
            <AboutCard label="Aider Ciko" components={[Rate, Donate, Report]} />
        </View>
    );
}

export default withScrollView(About);