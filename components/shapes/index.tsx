import { StyleSheet, View, ViewStyle } from "react-native";

interface ShapeProps {
    size: number;
    color: string;
    style: ViewStyle
};

export const Circle = ({ size, color, style }: ShapeProps) => {
    const wrapper = StyleSheet.create({
        circle: {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
        }
    });

    return (
        <View style={[wrapper.circle, style]} />
    );
};

export const Donut = ({ size, color, style }: ShapeProps) => {
    const wrapper = StyleSheet.create({
        donut: {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size / 4,
            borderColor: color
        }
    });
    return (
        <View style={[wrapper.donut, style]} />
    );
};

export const Triangle = ({ size, color, style }: ShapeProps) => {
    const wrapper = StyleSheet.create({
        triangle: {
            width: 0,
            height: 0,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderBottomWidth: size,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: color,
            transform: [{ rotate: "180deg" }]
        }
    });
    return (
        <View style={[wrapper.triangle, style]} />
    );
};

export const DiamondNarrow = ({ size, color, style }: ShapeProps) => {
    const wrapper = StyleSheet.create({
        diamondNarrow: {},
        diamondNarrowTop: {
            width: 0,
            height: 0,
            borderTopWidth: 0,
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            borderLeftWidth: size / 2,
            borderRightColor: "transparent",
            borderRightWidth: size / 2,
            borderBottomColor: color,
            borderBottomWidth: size / 1.42
        },
        diamondNarrowBottom: {
            width: 0,
            height: 0,
            borderTopWidth: size / 1.42,
            borderTopColor: color,
            borderLeftColor: "transparent",
            borderLeftWidth: size / 2,
            borderRightColor: "transparent",
            borderRightWidth: size / 2,
            borderBottomColor: "transparent",
            borderBottomWidth: 0
        }
    });

    return (
        <View style={[wrapper.diamondNarrow, style]}>
            <View style={wrapper.diamondNarrowTop} />
            <View style={wrapper.diamondNarrowBottom} />
        </View>
    );
};

export const CutDiamond = ({ size, color, style }: ShapeProps) => {
    const wrapper = StyleSheet.create({
        cutDiamond: {},
        cutDiamondTop: {
            width: size,
            height: 0,
            borderTopWidth: 0,
            borderTopColor: "transparent",
            borderLeftColor: "transparent",
            borderLeftWidth: size / 4,
            borderRightColor: "transparent",
            borderRightWidth: size / 4,
            borderBottomColor: color,
            borderBottomWidth: size / 4
        },
        cutDiamondBottom: {
            width: 0,
            height: 0,
            borderTopWidth: size / 1.42,
            borderTopColor: color,
            borderLeftColor: "transparent",
            borderLeftWidth: size / 2,
            borderRightColor: "transparent",
            borderRightWidth: size / 2,
            borderBottomColor: "transparent",
            borderBottomWidth: 0
        }
    });

    return (
        <View style={[wrapper.cutDiamond, style]}>
            <View style={wrapper.cutDiamondTop} />
            <View style={wrapper.cutDiamondBottom} />
        </View>
    );
};