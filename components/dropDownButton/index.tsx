import { blackA, pink, pinkDark } from "@/utils/colors";
import { Check, ChevronDown, X } from "lucide-react-native";
import { useRef, useState } from "react";
import { View, Text, Modal, Pressable, ScrollView, ViewStyle, StyleProp } from "react-native";
import PressableOpacity from "@/components/pressableOpacity";
import React from "react";

interface HasToString {
    toString(): string;
}

interface DropDownButtonModalProps<T> {
    current: T;
    data: T[];
    initialScrollIndex?: number;
    modalLabel: string;
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onPress: (item: T, index: number) => void;
};

interface DropDownButtonProps<T> {
    current: T;
    data: T[];
    initialScrollIndex?: number;
    modalLabel: string;
    buttonLabel: string;
    onPress: (item: T, index: number) => void;
    style?: StyleProp<ViewStyle>;
};

const ITEM_HEIGHT = 50;

const DropDownButtonModal = <T extends HasToString>({
    current,
    data,
    initialScrollIndex,
    modalLabel,
    visible,
    setVisible,
    onPress
}: DropDownButtonModalProps<T>) => {

    const scrollViewRef = useRef<ScrollView | null>(null);

    const initialScrollOffset = initialScrollIndex ? (ITEM_HEIGHT + 1) * initialScrollIndex : 0;

    const handleContentSizeChange = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: initialScrollOffset, animated: false });
        }
    };

    return (
        <Modal
            transparent={true}
            animationType={"fade"}
            visible={visible}
            onRequestClose={() => setVisible(false)}
            statusBarTranslucent
        >
            <Pressable
                onPress={(event) => {
                    if (event.target == event.currentTarget) {
                        setVisible(false);
                    }
                }}

                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: blackA.blackA8,
                }}
            >
                <View style={{
                    width: "80%",
                    padding: 10,
                    backgroundColor: pink.pink5,
                    borderBottomWidth: 1,
                    borderBottomColor: pink.pink6,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "700",
                        color: pinkDark.pink7
                    }}>
                        {modalLabel}
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
                        onPress={() => setVisible(false)}
                    >
                        <X
                            width={20}
                            height={20}
                            color={pinkDark.pink7}
                        />
                    </PressableOpacity>
                </View>

                <View style={{
                    width: "80%",
                    maxHeight: "50%",
                    overflow: "hidden",
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    backgroundColor: pink.pink4,
                }}>
                    <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={handleContentSizeChange}
                        showsVerticalScrollIndicator={false}
                        overScrollMode="never"
                        bounces={false}
                        alwaysBounceVertical={false}
                    >
                        {data.map((item, index) => (
                            <React.Fragment key={item.toString()}>
                                <PressableOpacity
                                    style={{
                                        height: ITEM_HEIGHT,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: 20,
                                        backgroundColor: item === current ? pink.pink5 : pink.pink4,
                                    }}
                                    onPress={() => {
                                        onPress(item, index);
                                        setVisible(false);
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: item === current ? pinkDark.pink7 : pinkDark.pink3,
                                            fontSize: 18,
                                            fontWeight: '700',
                                            textAlignVertical: 'center',
                                        }}
                                    >
                                        {item.toString()}
                                    </Text>

                                    {item === current && <Check size={18} color={pinkDark.pink7} />}
                                </PressableOpacity>

                                {index < data.length - 1 && (
                                    <View
                                        style={{
                                            backgroundColor: pink.pink5,
                                            height: 1,
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </ScrollView>
                </View>
            </Pressable>
        </Modal>
    );
};

export const DropDownButton = <T extends HasToString>({
    current,
    data,
    initialScrollIndex,
    buttonLabel,
    modalLabel,
    onPress,
    style
}: DropDownButtonProps<T>) => {
    const [dropDownButtonModalVisible, setDropDownButtonModalVisible] = useState(false);

    return (
        <>
            <DropDownButtonModal
                current={current}
                data={data}
                initialScrollIndex={initialScrollIndex}
                modalLabel={modalLabel}
                visible={dropDownButtonModalVisible}
                setVisible={setDropDownButtonModalVisible}
                onPress={onPress}
            />

            <PressableOpacity
                onPress={() => setDropDownButtonModalVisible(true)}
                style={[{
                    height: 50,
                    backgroundColor: pink.pink6,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                    flexDirection: 'row',
                    gap: 5,
                }, style]}>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: '700',
                        color: pinkDark.pink7,
                    }}>
                        {buttonLabel}
                    </Text>
                </View>
                <ChevronDown size={20} color={pinkDark.pink7} />
            </PressableOpacity>
        </>
    );
};