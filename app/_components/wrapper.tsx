import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';

interface ScrollViewWrapperProps {
    children: React.ReactNode;
}

const ScrollViewWrapper: React.FC<ScrollViewWrapperProps> = ({ children }) => {
    const isFocused = useIsFocused();
    return (
        isFocused &&
        <View
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <ScrollView
                style={{
                    height: "100%",
                    width: "100%",
                }}
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                bounces={false}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </View>
    );
};

const withScrollView = <P extends object>(Component: React.ComponentType<P>): React.FC<P> => {
    return (props: P) => (
        <ScrollViewWrapper>
            <Component {...props} />
        </ScrollViewWrapper>
    );
};

export default withScrollView;