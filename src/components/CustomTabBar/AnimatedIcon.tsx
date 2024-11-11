import { View, Text } from "react-native";
import React from "react";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { IconProps } from "../global/icons";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";
import { Theme } from "../../constants/Theme";

type AnimatedIconProps = {
  focused: boolean;
  FocusedIcon: React.FC<IconProps>;
  UnfocusedIcon: React.FC<IconProps>;
  size?: number;
};
export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  focused,
  FocusedIcon,
  UnfocusedIcon,
  size,
}) => {
  const scaleIconFocused = useSharedValue(focused ? 1.2 : 1);
  const scaleIconUnFocused = useSharedValue(1);
  const opacityFocused = useSharedValue(focused ? 1 : 0);
  const opacityUnFocused = useSharedValue(0);

  useAnimatedReaction(
    () => focused,
    () => {
      if (focused) {
        scaleIconFocused.value = withSequence(withSpring(1.4), withSpring(1.1));
        scaleIconUnFocused.value = withSpring(1);
        opacityFocused.value = withTiming(1);
        opacityUnFocused.value = withTiming(0);
      } else {
        scaleIconFocused.value = withSpring(1);
        scaleIconUnFocused.value = withSpring(1);
        opacityFocused.value = withTiming(0);
        opacityUnFocused.value = withTiming(1);
      }
    }
  );

  const focusedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleIconFocused.value }],
      opacity: opacityFocused.value,
    };
  });

  const unfocusedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleIconUnFocused.value }],
      opacity: opacityUnFocused.value,
    };
  });
  return (
    <View>
      <Animated.View style={[{ position: "absolute" }, focusedStyle]}>
        <FocusedIcon color={Theme.colors.icon} size={size} />
      </Animated.View>
      <Animated.View style={[unfocusedStyle]}>
        <UnfocusedIcon color={Theme.colors.icon} size={size} />
      </Animated.View>
    </View>
  );
};
