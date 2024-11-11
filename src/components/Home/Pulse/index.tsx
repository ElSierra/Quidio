import { View, Text } from "react-native";
import React from "react";
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
type Props = {
  width: number;
  height: number;
  color: string;
};
export const Pulse: React.FC<Props> = ({ width, height, color }) => {
  const biggerCircleScale = useSharedValue(1);
  const smallerCircleScale = useSharedValue(1);

  const biggerCircle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: biggerCircleScale.value }],
      opacity: interpolate(biggerCircleScale.value, [1, 1.4], [1, 0]),
    };
  });
  const smallerCircle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: smallerCircleScale.value }],
      opacity: interpolate(smallerCircleScale.value, [1, 1.6], [1, 0]),
    };
  });

  useAnimatedReaction(
    () => {
      return {
        biggerCircleScale,
        smallerCircleScale,
      };
    },
    ({ biggerCircleScale, smallerCircleScale }) => {
      if (biggerCircleScale.value === 1) {
        biggerCircleScale.value = withTiming(
          1.5,
          { duration: 4000, easing: Easing.inOut(Easing.quad) },
          () => {
            console.log(
              "🚀 ~ file: index.tsx:101 ~ biggerCircleScale.value",
              biggerCircleScale.value
            );
          }
        );
        smallerCircleScale.value = withTiming(
          1.5,
          { duration: 4000, easing: Easing.inOut(Easing.quad) },
          (finished) => {
            console.log("🚀 ~ file: index.tsx:108 ~ finished", finished);
            if (finished) {
              biggerCircleScale.value = 1;
              smallerCircleScale.value = 1;
            }
          }
        );
      }
      //   if (biggerCircleScale.value === 1.4) {
      //     biggerCircleScale.value = withTiming(1, { duration: 1000 });
      //     smallerCircleScale.value = withTiming(1, { duration: 1000 });
      //   }
    }
  );
  return (
    <Animated.View
      style={[
        {
          height: height,
          width: width,
          backgroundColor: color,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 9999,
        },
        biggerCircle,
      ]}
    >
      <Animated.View
        style={[
          {
            height: 120,
            width: 120,
            backgroundColor: color,
            borderRadius: 9999,
          },
          smallerCircle,
        ]}
      />
    </Animated.View>
  );
};
