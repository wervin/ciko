import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { pink, pinkDark } from '@/utils/colors'
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from 'react-native-svg';
import trianglify, { colorFunctions } from 'trianglify';
import { Dimensions, Platform, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export {
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('screen');

type TrianglifyProps = {
  trianglifyXml: string;
};


const TrianglifyBackground = () => {
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

const Trianglify: React.FC<TrianglifyProps> = React.memo(({ trianglifyXml }) => {
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
      const trianglifyXml = trianglify({
        cellSize: 42,
        xColors: ['#feeef8', '#f3c6e2'],
        colorFunction: colorFunctions.sparkle(0.5),
        width: width,
        height: height,
      }).toSVG().toString();

      setTrianglifyXml(trianglifyXml);
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && trianglifyXml) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, trianglifyXml]);

  if (!fontsLoaded || !trianglifyXml) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <TrianglifyBackground />
      <Trianglify trianglifyXml={trianglifyXml} />
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}> */}
        <Stack
          screenOptions={{
            headerShown: false,
            navigationBarColor: pink.pink5,
            statusBarBackgroundColor: pink.pink5,
            animation: 'fade',
          }}
          
        />
      {/* </SafeAreaView> */}
    </View>
  );
};

export default RootLayout;