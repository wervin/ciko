import React from 'react';
import { ScrollView, View } from 'react-native';
import { Footer } from './footer';
import { useIsFocused } from '@react-navigation/native';

interface ScrollViewWrapperProps {
    children: React.ReactNode;
}

const ScrollViewWrapper: React.FC<ScrollViewWrapperProps> = ({ children }) => {
    const isFocused = useIsFocused();

    return (
        isFocused &&
        <View
            style={{
                flex: 1
            }}
        >
            <ScrollView
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                bounces={false}
                overScrollMode="never"
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
            <Footer />
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