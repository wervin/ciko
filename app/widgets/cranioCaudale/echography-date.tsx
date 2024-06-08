import { pink, pinkDark } from "@/utils/colors";
import { View, Text, Pressable } from "react-native";
import { CalendarDays } from 'lucide-react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

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

            <Pressable onPress={showDatePicker}>

                <View
                    style={{
                        gap: 10
                    }}
                >

                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "800",
                            color: pinkDark.pink5,
                        }}
                    >
                        Date de l'Echographie
                    </Text>

                    <View
                        style={{
                            position: "relative"
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: pink.pink2,
                                borderColor: pink.pink6,
                                borderWidth: 2,
                                borderRadius: 10,
                                height: 60,
                            }}
                        />

                        <Text
                            style={{
                                position: "absolute",
                                top: 0,
                                right: "15%",
                                width: "85%",
                                height: 60,
                                paddingRight: 15,
                                color: pinkDark.pink7,
                                fontSize: 22,
                                fontWeight: "700",
                                textAlignVertical: "center",
                                textAlign: "right",
                            }}
                        >
                            {date.toLocaleDateString()}
                        </Text>

                        <View
                            style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                height: 60,
                                width: "15%",
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                backgroundColor: pink.pink5,
                                borderColor: pink.pink6,
                                borderWidth: 2,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <CalendarDays
                                color={pinkDark.pink7}
                                size={24}
                            />
                        </View>

                    </View>

                </View>

            </Pressable>
        </>
    );
};