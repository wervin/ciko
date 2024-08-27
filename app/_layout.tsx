import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { pink } from '@/utils/colors'
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from 'react-native-svg';
import trianglify, { colorFunctions } from 'trianglify';
import { Dimensions } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const Trianglify = () => {
  const { width, height } = Dimensions.get('window');

  const trianglify_xml = trianglify({
    cellSize: 42,
    xColors: ['#feeef8', '#f3c6e2'],
    colorFunction: colorFunctions.sparkle(0.5),
    width: width,
    height: height
  }).toSVG().toString();

  return <SvgXml
    xml={trianglify_xml}
    width={width}
    height={height}
    style={{
      position: "absolute",
      bottom: 0,
      left: 0
    }}
  />
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Righteous: require('../assets/fonts/Righteous-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ position: "relative", width: "100%", height: "100%" }}>
      <Trianglify />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          navigationBarColor: pink.pink5,
          statusBarColor: pink.pink5,
          statusBarStyle: "dark",
          animation: "slide_from_right",
        }}
      />
    </SafeAreaView>
  );
}

export default RootLayout;