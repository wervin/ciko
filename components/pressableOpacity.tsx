import React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
  PressableProps,
} from 'react-native';

interface PressableOpacityProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
}

const PressableOpacity: React.FC<PressableOpacityProps> = ({
  children,
  style,
  activeOpacity = 0.5,
  ...rest
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style,
        { opacity: pressed ? activeOpacity : 1 },
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

export default PressableOpacity;