import { View } from "react-native";
import { GestiationalAge } from "./gestiational-age";
import { useState } from "react";
import { AbdominalCircumference } from "./abdominal-circumference";
import { HeadCircumference } from "./head-circumference";

// WHo Intergrowth-21

const PoidsFoetal = () => {
    const [abdominalCircumference, setAbdominalCircumference] = useState("");
    const [headCircumference, setHeadCircumference] = useState("");
    const [selectedWeek, setSelectedWeek] = useState('1');
    const [selectedDay, setSelectedDay] = useState('1');

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                flex: 1,
                gap: 20,
                padding: 20
            }}
        >
            <GestiationalAge
                selectedWeek={selectedWeek}
                setSelectedWeek={setSelectedWeek}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
            />

            <AbdominalCircumference
                abdominalCircumference={abdominalCircumference}
                setAbdominalCircumference={setAbdominalCircumference}
            />

            <HeadCircumference
                headCircumference={headCircumference}
                setHeadCircumference={setHeadCircumference}
            />

            <AbdominalCircumference
                abdominalCircumference={abdominalCircumference}
                setAbdominalCircumference={setAbdominalCircumference}
            />
        </View>
    );
};

export default PoidsFoetal;