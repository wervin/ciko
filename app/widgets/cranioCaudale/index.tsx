import { useState } from "react";
import { View } from "react-native";
import { EchographyDate } from "./echography-date";
import { CranioCaudaleInput, GestationalAgeCurves } from "./cranio-caudale-input";
import { GestiationalAge } from "./gestiational-age";
import { PregnancyStartDate } from "./pregnancy-start-date";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import withScrollView from "../_components/wrapper";
import { Term } from "./term";

const CranioCaudale = () => {
    const [crownRumpLength, setCrownRumpLength] = useState("");
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [gestationalAgeCurve, setGestationalAgeCurve] = useState(GestationalAgeCurves.Intergrowth);
    const [isCrownRumpLengthValid, setIsCrownRumpLengthValid] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (date)
            setDate(date);
        setShow(false);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    const onChangeText = (text: string) => {
        setIsValid(false);
        const re = /[+-]?([0-9]*[.])?[0-9]+/
        if (text === "" || re.test(text))
            setCrownRumpLength(text);
    };

    const robinson = (crl: string) => {
        return Math.round(8.052 * Math.sqrt(parseFloat(crl) * 1.037) + 23.73);
    }

    const intergrowth = (crl: string) => {
        const floatCrl = parseFloat(crl);
        return Math.round(40.9041 + 3.21585 * Math.sqrt(floatCrl) + 0.348956 * floatCrl)
    }

    const gestationalAge = (crl: string) => {
        return gestationalAgeCurve === GestationalAgeCurves.Robinson ? robinson(crl) : intergrowth(crl)
    };

    const pregnancyStartDate = (crl: string) => {
        const d = new Date(date)
        d.setDate(d.getDate() - gestationalAge(crl) + 14)
        return d.toLocaleDateString()
    }

    const TermDate = (crl: string) => {
        const d = new Date(date)
        d.setDate(d.getDate() - gestationalAge(crl) + 14);
        d.setDate(d.getDate() + 273);
        return d.toLocaleDateString()
    }

    const onPressGestationalAgeCurve = (curve: number) => {
        setGestationalAgeCurve(curve);
    }

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                flex: 1,
                gap: 30,
                padding: 20
            }}
        >
            <EchographyDate show={show} date={date} onDateChange={onDateChange} showDatePicker={showDatePicker} />

            <CranioCaudaleInput
                onChangeText={onChangeText}
                crownRumpLength={crownRumpLength}
                isCrownRumpLengthValid={isCrownRumpLengthValid}
                setIsCrownRumpLengthValid={setIsCrownRumpLengthValid}
                isValid={isValid}
                setIsValid={setIsValid}
                onPressGestationalAgeCurve={onPressGestationalAgeCurve}
                gestationalAgeCurve={gestationalAgeCurve}
            />

            {isValid && isCrownRumpLengthValid && <GestiationalAge crownRumpLength={crownRumpLength} gestationalAge={gestationalAge} />}

            {isValid &&  isCrownRumpLengthValid && <PregnancyStartDate crownRumpLength={crownRumpLength} pregnancyStartDate={pregnancyStartDate} />}

            {isValid && isCrownRumpLengthValid && <Term crownRumpLength={crownRumpLength} termDate={TermDate} />}
        </View >
    );
};

export default withScrollView(CranioCaudale);