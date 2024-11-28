import PressableOpacity from "@/components/pressableOpacity";
import { blackA, pink, pinkDark } from "@/utils/colors";
import { Goal, X } from "lucide-react-native";
import { Modal, View, Text, ScrollView } from "react-native";
import { IconographyWidgetProps } from "../_widgets";
import { useWidgetStoreContext } from "@/providers/widgetStoreProvider";
import ImageSlider from "@/components/imageSlider";
import { GestureHandlerRootView, HandlerStateChangeEvent, State, TapGestureHandler, TapGestureHandlerEventPayload } from "react-native-gesture-handler";


export const IconographyModal = () => {
    const widgetData = useWidgetStoreContext<IconographyWidgetProps>((store) => store.widgetData);
    const setWidgetData = useWidgetStoreContext((store) => store.setWidgetData);

    const handleOutsideTap = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
            setWidgetData({ ...widgetData, iconography: undefined });
        }
    };

    const handleInsideTap = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.END) {
        }
    };

    return (
        widgetData?.iconography &&
        <Modal
            transparent={true}
            animationType={"fade"}
            visible={widgetData?.iconography !== undefined}
            onRequestClose={() => setWidgetData({ ...widgetData, iconography: undefined })}
            statusBarTranslucent
        >
            <GestureHandlerRootView>
                <TapGestureHandler onHandlerStateChange={handleOutsideTap}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: blackA.blackA8,
                        }}
                    >
                        <TapGestureHandler onHandlerStateChange={handleInsideTap}>
                            <View
                                style={{
                                    width: "90%",
                                    backgroundColor: pink.pink4,
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    maxHeight: 670
                                }}
                            >

                                <View style={{
                                    paddingHorizontal: 10,
                                    height: 70,
                                    backgroundColor: pink.pink5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: pink.pink6,
                                    borderTopLeftRadius: 16,
                                    borderTopRightRadius: 16,
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    gap: 10
                                }}>

                                    <Text style={{
                                        flex: 1,
                                        fontSize: 20,
                                        fontWeight: "700",
                                        color: pinkDark.pink7
                                    }}>
                                        {widgetData?.iconography?.title}
                                    </Text>

                                    <PressableOpacity
                                        style={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: pink.pink7,
                                            borderRadius: 30,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                        onPress={() => setWidgetData({ ...widgetData, iconography: undefined })}
                                    >
                                        <X
                                            width={20}
                                            height={20}
                                            color={pinkDark.pink7}
                                        />
                                    </PressableOpacity>
                                </View>

                                <View
                                    style={{
                                        padding: 10,
                                        borderBottomLeftRadius: 16,
                                        borderBottomRightRadius: 16,
                                        gap: 30,
                                        maxHeight: 600,
                                    }}
                                >
                                    <ScrollView
                                        alwaysBounceHorizontal={false}
                                        alwaysBounceVertical={false}
                                        bounces={false}
                                        overScrollMode="never"
                                        showsVerticalScrollIndicator={false}
                                        style={{ borderRadius: 16, overflow: "hidden" }}
                                    >
                                        <ImageSlider images={widgetData?.iconography?.images} subtitles={widgetData?.iconography?.subtitles} />
                                        <View style={{ backgroundColor: pink.pink5, padding: 10, gap: 10 }}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: "500",
                                                color: pinkDark.pink3
                                            }}>
                                                {widgetData?.iconography?.description}
                                            </Text>
                                            <View style={{ backgroundColor: pink.pink6, borderRadius: 16, padding: 5}}>
                                                {
                                                    widgetData?.iconography?.criteria.map((criteria, index) => (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                height: 40,
                                                                borderRadius: 16,
                                                                alignItems: "center",
                                                                flexDirection: "row",
                                                                gap: 10
                                                            }}
                                                        >
                                                            <Goal size={20} color={pinkDark.pink7} />

                                                            <Text
                                                                style={{
                                                                    flex: 1,
                                                                    fontSize: 14,
                                                                    fontWeight: "700",
                                                                    color: pinkDark.pink7
                                                                }}
                                                            >
                                                                {criteria}
                                                            </Text>
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </TapGestureHandler>
                    </View>
                </TapGestureHandler>
            </GestureHandlerRootView >
        </Modal >
    )
}