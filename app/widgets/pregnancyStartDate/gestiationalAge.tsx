import { pink, pinkDark } from "@/utils/colors";
import { CalendarClock, CalendarHeart, } from "lucide-react-native";
import { View, Text } from "react-native";

interface GestiationalAgeProps {
    gestationalAge: number;
};

export const GestiationalAge = ({
    gestationalAge
}: GestiationalAgeProps) => {
    return (
        <View
            style={{
                gap: 10,
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "700",
                    color: pinkDark.pink3
                }}
            >
                Age Gestationnel
            </Text>

            <View
                style={{
                    height: 60,
                    borderRadius: 16,
                    flexDirection: "row",
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: pink.pink5,
                    borderColor: pink.pink5,
                    borderWidth: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                            color: pinkDark.pink3,
                            fontSize: 22,
                            fontWeight: "800"
                        }}
                    >
                        <Text>{Math.trunc(gestationalAge / 7)} </Text>
                        <Text style={{ color: pinkDark.pink7, fontWeight: "700" }}>SA</Text>
                        <Text> {gestationalAge % 7} </Text>
                        <Text style={{ color: pinkDark.pink7, fontWeight: "700" }}>J</Text>
                    </Text>
                </View>

                <View style={{
                    backgroundColor: pink.pink6,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    width: 60
                }}
                >
                    <CalendarClock
                        color={pinkDark.pink7}
                        size={24}
                    />
                </View>
            </View>
        </View>
    );
}