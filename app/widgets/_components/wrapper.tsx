import { pink } from '@/utils/colors';
import React from 'react';
import { ScrollView, Dimensions } from 'react-native';

interface ScrollViewWrapperProps {
    children: React.ReactNode;
}

const ScrollViewWrapper: React.FC<ScrollViewWrapperProps> = ({ children }) => {
    return (
        <ScrollView
            style={{
                backgroundColor: pink.pink3,
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