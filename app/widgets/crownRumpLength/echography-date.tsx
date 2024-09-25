import { blackA, pink, pinkA, pinkDark, pinkDarkA } from "@/utils/colors";
import { View, Text, Pressable, Modal } from "react-native";
import { CalendarDays } from 'lucide-react-native';
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export const EchographyDate = () => {
    const [descriptionModalVisible, setDescriptionModalVisible] = useState<boolean>(false);
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    return (
        <>
            <Modal
                transparent={true}
                animationType={"fade"}
                visible={descriptionModalVisible}
                onRequestClose={() => setDescriptionModalVisible(false)}
                statusBarTranslucent
            >
                <Pressable
                    onPress={(event) => {
                        if (event.target == event.currentTarget) {
                            setDescriptionModalVisible(false);
                        }
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: blackA.blackA8,
                    }}
                >
                    <Calendar currentDate={currentDate} onCurrentDateChange={setCurrentDate} open={setDescriptionModalVisible}/>
                </Pressable>
            </Modal>

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
                    Date de l'Echographie
                </Text>

                <Pressable
                    style={{
                        height: 60,
                        borderRadius: 16,
                        flexDirection: "row",
                    }}
                    onPress={() => setDescriptionModalVisible(true)}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: pink.pink4,
                        borderColor: pink.pink7,
                        borderWidth: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopLeftRadius: 16,
                        borderBottomLeftRadius: 16,
                    }}
                    >
                        <Text
                            style={{
                                color: pinkDark.pink3,
                                fontSize: 22,
                                fontWeight: "700"
                            }}
                        >
                            {currentDate.toLocaleDateString()}
                        </Text>
                    </View>

                    <View style={{
                        backgroundColor: pink.pink7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 16,
                        width: 60
                    }}
                    >
                        <CalendarDays
                            color={pinkDark.pink7}
                            size={24}
                        />
                    </View>
                </Pressable>
            </View>
        </>
    );
};