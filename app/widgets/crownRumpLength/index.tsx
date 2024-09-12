import { useState, useEffect } from "react";
import { Pressable, View, Text } from "react-native";
import { EchographyDate } from "./echography-date";
import { CrownRumpLengthInput, GestationalAgeCurves } from "./crown-rump-length-input";
import { GestiationalAge } from "./gestiational-age";
import { PregnancyStartDate } from "./pregnancy-start-date";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import withScrollView from "@/app/_components/wrapper";
import { Term } from "./term";
import { pink, pinkDark, purple } from "@/utils/colors";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import { CrownRumpLengthWidget } from "../_components/widgets";

const CrownRumpLength = () => {
    const [crownRumpLength, setCrownRumpLength] = useState("");
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [gestationalAgeCurve, setGestationalAgeCurve] = useState(GestationalAgeCurves.Intergrowth);
    const [isCrownRumpLengthValid, setIsCrownRumpLengthValid] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const setWidgetInfo = useWidgetStoreContext((store) => store.setWidgetInfo);

    useEffect(() => {
        setWidgetInfo(CrownRumpLengthWidget);
    }, [setWidgetInfo]);

    const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (date)
            setDate(date);
        setShow(false);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    const onChangeCrownRumpLength = (text: string) => {
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
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View style={{
                width: "100%",
                padding: 10,
                gap: 10
            }}>
                <EchographyDate show={show} date={date} onDateChange={onDateChange} showDatePicker={showDatePicker} />

                <CrownRumpLengthInput
                    onChangeCrownRumpLength={onChangeCrownRumpLength}
                    crownRumpLength={crownRumpLength}
                    isCrownRumpLengthValid={isCrownRumpLengthValid}
                    setIsCrownRumpLengthValid={setIsCrownRumpLengthValid}
                    isValid={isValid}
                    setIsValid={setIsValid}
                    onPressGestationalAgeCurve={onPressGestationalAgeCurve}
                    gestationalAgeCurve={gestationalAgeCurve}
                />
            </View>

            {/* 
            {(isValid && isCrownRumpLengthValid) ?
                <View
                    style={{
                        backgroundColor: purple.purple3,
                        margin: 20,
                        padding: 20,
                        gap: 30,
                        borderRadius: 10,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 3,
                    }}
                >
                    <GestiationalAge crownRumpLength={crownRumpLength} gestationalAge={gestationalAge} />
                    <PregnancyStartDate crownRumpLength={crownRumpLength} pregnancyStartDate={pregnancyStartDate} />
                    <Term crownRumpLength={crownRumpLength} termDate={TermDate} />
                </View>
                :
                <View />
            } */}
        </View >
    );
};

export default withScrollView(CrownRumpLength);