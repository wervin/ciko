import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { pink, pinkDark } from '@/utils/colors'
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from 'react-native-svg';
import trianglify, { colorFunctions } from 'trianglify';
import { Dimensions, Platform, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export {
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type TrianglifyProps = {
  trianglifyXml: string;
  width: number;
  height: number;
};


type TrianglifyBackgroundProps = {
  width: number;
  height: number;
};

const TrianglifyBackground = ({ width, height }: TrianglifyBackgroundProps) => {
  return (
    <View
      style={{
        position: "absolute",
        width: width,
        height: height,
        top: 0,
        left: 0,
        backgroundColor: pinkDark.pink7,
      }} />
  );
};

const Trianglify: React.FC<TrianglifyProps> = React.memo(({ trianglifyXml, width, height }) => {
  return (
    <SvgXml
      xml={trianglifyXml}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
});

const RootLayout = () => {
  const [trianglifyXml, setTrianglifyXml] = useState<string | null>(null);
  const [parentDimensions, setParentDimensions] = useState<{ width: number; height: number } | null>(null);
  const [safeAreaDimensionsReady, setSafeAreaDimensionsReady] = useState(false);

  const [fontsLoaded, fontsError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Righteous: require('../assets/fonts/Righteous-Regular.ttf'),
  });

  const { colors } = useTheme();
  colors.background = "transparent";

  useEffect(() => {
    if (fontsError) throw fontsError;
  }, [fontsError]);

  useEffect(() => {
    async function prepare() {
      if (parentDimensions) {
        const trianglifyXml = trianglify({
          cellSize: 42,
          xColors: ['#feeef8', '#f3c6e2'],
          colorFunction: colorFunctions.sparkle(0.5),
          width: parentDimensions.width,
          height: parentDimensions.height,
        }).toSVG().toString();

        setTrianglifyXml(trianglifyXml);
      }
    }

    prepare();
  }, [parentDimensions]);

  const onLayoutSafeAreaView = (event: any) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== parentDimensions?.width || height !== parentDimensions?.height) {
      setParentDimensions({ width, height });
      setSafeAreaDimensionsReady(true);
    }
  };

  // Hide splash screen when all resources are ready
  useEffect(() => {
    if (fontsLoaded && trianglifyXml && safeAreaDimensionsReady) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [fontsLoaded, trianglifyXml, safeAreaDimensionsReady]);

  if (!fontsLoaded) {
    return null;
  }

  const screenOptions: NativeStackNavigationOptions = Platform.OS == "ios" ?
    {
      headerShown: false,
      navigationBarColor: pink.pink5,
      statusBarBackgroundColor: pink.pink5,
      animation: 'none',
    } :
    {
      headerShown: false,
      navigationBarColor: pink.pink5,
      statusBarBackgroundColor: pink.pink5,
      statusBarStyle: "dark",
      animation: 'none',
    };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: pink.pink5 }}>
        <View style={{ flex: 1 }} onLayout={onLayoutSafeAreaView}>
          {parentDimensions && <TrianglifyBackground {...parentDimensions} />}
          {parentDimensions && trianglifyXml && <Trianglify trianglifyXml={trianglifyXml} {...parentDimensions} />}
          <Stack
            screenOptions={screenOptions}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RootLayout;