import { blue, pink, pinkDark, purple, purpleA, purpleDark } from "@/utils/colors";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, View, Text, Easing, TextProps } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Rocket } from 'lucide-react-native';
import MaskedView from '@react-native-masked-view/masked-view';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const ExecuteButton = () => {
    const startValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(startValue, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: false
                }),
                Animated.timing(startValue, {
                    toValue: 0,
                    duration: 3000,
                    useNativeDriver: false
                }),
            ])
        ).start();
    }, [startValue]);

    const primaryColor = startValue.interpolate({
        inputRange: [0, 1],
        outputRange: [purpleDark.purple6, purpleDark.purple10]
    });

    const secondaryColor = startValue.interpolate({
        inputRange: [0, 1],
        outputRange: [purpleDark.purple10, purpleDark.purple6]
    });

    return (
        // <Animated.View
        //     style={{
        //         // width: 200,
        //         // height: 50,
        //         // backgroundColor: "green",
        //         shadowColor: purpleA.purpleA10, // Color of the glow (e.g., purple)
        //         shadowOffset: { width: 0, height: 0 },
        //         shadowOpacity: 1,
        //         shadowRadius: 10, // Adjust the shadow radius using animation
        //         borderRadius: 10,
        //         padding: 5,
        //         elevation: 1 // This is for Android
        //     }}
        // >

        // <View
        //     style={{
        //         width: 200,
        //         height: 100,
        //         backgroundColor: "white",
        //     }}
        // >
        //     <GradientText
        //         style={{
        //             color: pinkDark.pink5,
        //             fontSize: 22,
        //             fontWeight: "700",
        //             textAlignVertical: "center",
        //             textAlign: "center",
        //         }}
        //     >
        //         Tessst
        //     </GradientText>
        // </View>



        <AnimatedLinearGradient
            colors={[primaryColor, secondaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
                width: "100%",
                borderRadius: 12,
                padding: 4,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            }}>
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: purple.purple6,
                    borderRadius: 10,
                    padding: 10,
                    gap: 10,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
                }}
            >

                <MaskedView maskElement={
                    <Text
                        style={{
                            fontSize: 26,
                            fontWeight: "700",
                            textAlignVertical: "center",
                            textAlign: "center",
                        }}
                    >
                        Calculer
                    </Text>
                }>
                    <AnimatedLinearGradient
                        colors={[secondaryColor, primaryColor]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text
                            style={{
                                fontSize: 26,
                                fontWeight: "700",
                                textAlignVertical: "center",
                                textAlign: "center",
                                opacity: 0
                            }}
                        >
                            Calculer
                        </Text>
                    </AnimatedLinearGradient>
                </MaskedView>

                <MaskedView maskElement={
                    <Rocket
                        color="white"
                        size={24}
                    />
                }>
                    <AnimatedLinearGradient
                        colors={[secondaryColor, primaryColor]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Rocket size={24} />
                    </AnimatedLinearGradient>
                </MaskedView>
            </View>
        </AnimatedLinearGradient>
        // {/* <Pressable
        //     style={{
        //         borderRadius: 10,
        //         backgroundColor: "red",
        //         padding: 10,
        //         // padding: 20
        //         // backgroundColor: purple.purple3,
        //         // margin: 20,
        //         // padding: 20,
        //         // gap: 30,
        //         // borderRadius: 10,
        //         // shadowOffset: {
        //         //     width: 0,
        //         //     height: 2,
        //         // },
        //         // shadowOpacity: 0.25,
        //         // shadowRadius: 3.84,
        //         // elevation: 2
        //     }}
        // >
        //     <Text
        //         style={{
        //             color: pinkDark.pink5,
        //             fontSize: 22,
        //             fontWeight: "700",
        //             textAlignVertical: "center",
        //             textAlign: "center",
        //         }}
        //     >
        //         Calculer
        //     </Text>

        // </Pressable> */}
        // </Animated.View>
    );
};