import { pinkDark, pink } from '@/utils/colors';
import { View, Text } from 'react-native';
import { Info, LucideIcon } from 'lucide-react-native';
import { ComponentType } from 'react';
import withScrollView from '../_components/wrapper';

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

const Version = () => {
    return (
        <AboutView label={"v1.0.3"} Icon={Info} primaryColor={pink.pink5} secondaryColor={pink.pink6} textColor={pinkDark.pink7} />
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
                    fontSize: 22,
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