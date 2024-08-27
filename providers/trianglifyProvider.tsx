import React, { createContext, useContext, ReactNode } from 'react';
import { Dimensions } from 'react-native';
import trianglify, { colorFunctions } from 'trianglify';

interface TrianglifyContextType {
    trianglify_xml: string;
    width: number;
    height: number;
}

const TrianglifyContext = createContext<TrianglifyContextType | undefined>(undefined);

interface TrianglifyProviderProps {
    children: ReactNode;
}

export const TrianglifyProvider: React.FC<TrianglifyProviderProps> = ({ children }) => {
    const { width, height } = Dimensions.get('window');

    const trianglify_xml = trianglify({
        cellSize: 42,
        xColors: ['#feeef8', '#f3c6e2'],
        colorFunction: colorFunctions.sparkle(0.5),
        width: width,
        height: height
    }).toSVG().toString();

    return (
        <TrianglifyContext.Provider value={{ trianglify_xml: trianglify_xml, width: width, height: height }}>
            {children}
        </TrianglifyContext.Provider >
    );
};

// Hook to use the Trianglify component
export const useTrianglify = () => {
    const context = useContext(TrianglifyContext);
    if (context === undefined) {
        throw new Error('useTrianglify must be used within a TrianglifyProvider');
    }
    return context;
};
