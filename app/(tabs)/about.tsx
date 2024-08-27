import { pinkDark, pink, purpleDark, purple, violet, violetDark } from '@/utils/colors';
import { View, Text, Pressable } from 'react-native';
import { HandCoins, HandHeart, Info, Bug, AtSign, LucideIcon } from 'lucide-react-native';
import { ComponentType } from 'react';
import withScrollView from '../_components/wrapper';

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
        <AboutButton label={"wervin.dev"} Icon={AtSign} foregroundColor={pinkDark.pink7} backgroundColor={pink.pink7} />
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
                padding: 8,
                paddingLeft: 20,
                borderRadius: 16,
                gap: 10,
                alignItems: "center",
                flexDirection: "row",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
            }}
        >
            <Icon size={28} color={foregroundColor} />

            <Text
                style={{
                    fontSize: 24,
                    fontFamily: "Righteous",
                    fontWeight: "600",
                    color: foregroundColor
                }}
            >
                {label}
            </Text>
        </Pressable>
    );
};

const AboutCard = ({ label, components }: AboutCardProps) => {
    return (
        <View style={{
            width: "100%",
            gap: 10,
            padding: 20,
            backgroundColor: pink.pink4,
            borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
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