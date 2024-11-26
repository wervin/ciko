import { View, Text } from "react-native"
import { Iconography } from "./iconography";
import { IconographyCard } from "./iconographyCard";
import { pink, pinkDark } from "@/utils/colors";

interface TrimesterCardProps {
    title: string,
    iconographyList: Iconography[];
};

export const TrimesterCard = ({ title, iconographyList }: TrimesterCardProps) => {
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
                {title}
            </Text>

            {
                iconographyList.map((iconography) =>
                    <IconographyCard key={iconography.id} iconography={iconography} />
                )
            }
        </View>
    );
};