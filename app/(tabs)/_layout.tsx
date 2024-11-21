import { Tabs } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../_components/header";
import { pink, pinkDark } from '@/utils/colors';
import { Animated, Text, StyleSheet, Pressable, StyleProp, ViewStyle, GestureResponderEvent, View } from 'react-native';
import { Calculator, Info, Library, LucideIcon } from 'lucide-react-native'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

const TabBarIndex = {
  Widgets: 0,
  Documents: 1,
  About: 2
};

export type TabBarIndexType = typeof TabBarIndex[keyof typeof TabBarIndex];

interface TabBarAnimatedButtonProps {
  index: TabBarIndexType;
  currentIndex: TabBarIndexType;
  setCurrentIndex: (index: TabBarIndexType) => void;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  label: string;
  Icon: LucideIcon;
};

const TabBarAnimatedButton = ({ index, currentIndex, setCurrentIndex, style, onPress, label, Icon }: TabBarAnimatedButtonProps) => {

  const widthAnim = useRef(new Animated.Value(20)).current;

  const isSelected = index === currentIndex;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: isSelected ? 50 : 20,
      duration: 300,
      useNativeDriver: false,
    }).start();
  });

  const handleOnPress = (event: GestureResponderEvent) => {
    onPress && onPress(event);
    setCurrentIndex(index);
  };

  return (
    <Pressable onPress={handleOnPress} style={[style, { alignContent: "center", justifyContent: "center" }]}>
      <Animated.View
        style={{
          width: widthAnim.interpolate({
            inputRange: [20, 50],
            outputRange: ['20%', '50%'],
          }),
        }}
      >
        <View
          style={{
            backgroundColor: isSelected ? pink.pink7 : 'transparent',
            padding: 4,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center"

          }}
        >
          <Icon
            color={isSelected ? pinkDark.pink7 : pinkDark.pink3}
            size={32}
          />
        </View>
      </Animated.View>

      <Text style={isSelected ? styles.tabBarLabelSelected : styles.tabBarLabel}>{label}</Text>
    </Pressable>
  );
};

export default function TabLayout() {
  const [currentIndex, setCurrentIndex] = useState<TabBarIndexType>(0);

  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        sceneStyle: { backgroundColor: 'transparent' },
        animation: 'none',
        tabBarStyle: {
          height: 80,
          backgroundColor: pink.pink5,
          elevation: 0,
          borderColor: pink.pink6,
          borderTopWidth: 1,
          paddingBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) =>
            <TabBarAnimatedButton
              index={TabBarIndex.Widgets}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              style={props.style as StyleProp<ViewStyle>}
              onPress={props.onPress}
              label={'Calculateurs'}
              Icon={Calculator} />
        }}
      />
      <Tabs.Screen
        name="documentation"
        options={{
          tabBarButton: (props) =>
            <TabBarAnimatedButton
              index={TabBarIndex.Documents}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              style={props.style as StyleProp<ViewStyle>}
              onPress={props.onPress}
              label={'Documents'}
              Icon={Library} />
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarButton: (props) =>
            <TabBarAnimatedButton
              index={TabBarIndex.About}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              style={props.style as StyleProp<ViewStyle>}
              onPress={props.onPress}
              label={'À Propos'}
              Icon={Info} />
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tabBarIcon: {
    padding: 4,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  tabBarIconSelected: {
    backgroundColor: pink.pink7,
    padding: 4,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  tabBarLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: pinkDark.pink3,
  },
  tabBarLabelSelected: {
    fontSize: 16,
    fontWeight: "800",
    color: pinkDark.pink7,
  }
});