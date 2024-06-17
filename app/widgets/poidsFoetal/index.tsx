import { View } from "react-native";
import { GestiationalAge } from "./gestiational-age";

// WHo Intergrowth-21

const PoidsFoetal = () => {
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
            <GestiationalAge />
        </View>
    );
};

export default PoidsFoetal;