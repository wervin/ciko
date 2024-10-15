import { Tabs } from 'expo-router';
import { useEffect, useRef } from "react";
import { Header } from "../_components/header";
import { pink, pinkDark } from '@/utils/colors';
import { Animated, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Calculator, CalendarRange, Info, LucideIcon, View } from 'lucide-react-native'
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

interface TabBarAnimatedButtonProps {
  props: BottomTabBarButtonProps,
  label: string,
  Icon: LucideIcon
};

const TabBarAnimatedButton = ({ props, label, Icon }: TabBarAnimatedButtonProps) => {
  const widthAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: props.accessibilityState?.selected ? 50 : 20,
      duration: 300,
      useNativeDriver: false,
    }).start();
  });

  const animatedStyle = {
    width: widthAnim.interpolate({
      inputRange: [20, 50],
      outputRange: ['20%', '50%'],
    }),
  };

  return (
    <Pressable {...props} style={[props.style, { alignContent: "center", justifyContent: "center" }]}>
      <Animated.View
        style={[props.accessibilityState?.selected ? styles.tabBarIconSelected : styles.tabBarIcon, animatedStyle]}
      >
        <Icon
          color={props.accessibilityState?.selected ? pinkDark.pink7 : pinkDark.pink3}
          size={32}
        />
      </Animated.View>

      <Text style={props.accessibilityState?.selected ? styles.tabBarLabelSelected : styles.tabBarLabel}>{label}</Text>
    </Pressable>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: "transparent"
      }}
      screenOptions={{
        header: () => <Header />,
        tabBarStyle: {
          height: 80,
          backgroundColor: pink.pink5,
          elevation: 0,
          borderTopColor: pink.pink6,
          borderTopWidth: 1
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => <TabBarAnimatedButton props={props} label={'Calculateurs'} Icon={Calculator}></TabBarAnimatedButton>
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarButton: (props) => <TabBarAnimatedButton props={props} label={'Calendrier'} Icon={CalendarRange}></TabBarAnimatedButton>
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarButton: (props) => <TabBarAnimatedButton props={props} label={'À Propos'} Icon={Info}></TabBarAnimatedButton>
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