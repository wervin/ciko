import { pink, pinkDark } from "@/utils/colors";
import { View, Text, Pressable } from "react-native";
import { CalendarDays } from 'lucide-react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Shadow } from "react-native-shadow-2";

interface EchographyDateProps {
    show: boolean;
    date: Date;
    onDateChange: (event: DateTimePickerEvent, date?: Date) => void;
    showDatePicker: () => void;
};

export const EchographyDate = ({ show, date, onDateChange, showDatePicker }: EchographyDateProps) => {
    return (
        <>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onDateChange}
                    timeZoneName="Europe/Paris"
                    style={{
                        backgroundColor: pink.pink7,
                    }}
                />
            )}

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
                    onPress={showDatePicker}
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
                            {date.toLocaleDateString()}
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