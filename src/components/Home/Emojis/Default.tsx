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
import { Canvas, Group, Path, Skia } from "@shopify/react-native-skia";

type DefaultProps = {
  width: number;
  height: number;
  color: string;
  emoji?: "Happy" | "Sad" | "Default" | "Angry" | "Good" | "Normal";
  isSelected?: boolean;
  onSelect?: () => void;
};
export const Default: React.FC<DefaultProps> = ({
  width,
  height,
  color,
  emoji,
  isSelected,
  onSelect,
}) => {
  const sadPath = Skia.Path.Make();
  const happyPath = Skia.Path.Make();
  const goodPath = Skia.Path.Make();
  // Add an arc from start angle to sweep angle within a given rectangle.
  sadPath.addArc(
    { x: width / 5, y: 3, width: width / 4, height: height / 4 },
    -180,
    180
  );
  happyPath.addArc(
    { x: width / 5, y: -4, width: width / 4, height: height / 4 },
    -180,
    -180
  );
  goodPath.addArc(
    { x: width / 5, y: 2, width: width / 4, height: height / 8 },
    -180,
    -180
  );

  const emojiScale = useSharedValue(1);
  const emojiAnimStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: emojiScale.value }],
    };
  });

  useAnimatedReaction(
    () => {
      return isSelected;
    },
    (isSelected) => {
      if (isSelected) {
    emojiScale.value = withSequence(withTiming(1.7),withSpring(1.5));
      } else {
        emojiScale.value = withSpring(1);
      }
    }
  );
  return (
    <Animated.View
      onTouchEnd={onSelect}
      style={[
        {
          width: width,
          height: height,
          borderRadius: 9999,
          backgroundColor: color,
          padding: width / 6,
          justifyContent: "center",
          alignItems: "center",
        },
        emojiAnimStyle,
      ]}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {emoji === "Default" && (
          <View
            style={{
              width: width / 8,
              height: height / 24,
              backgroundColor: "black",
              borderRadius: 999,
            }}
          />
        )}
        <View
          style={{
            height: height / 8,
            width: width / 8,
            backgroundColor: "black",
            borderRadius: 999,
          }}
        />
        {emoji !== "Default" && (
          <View
            style={{
              height: height / 8,
              width: width / 8,
              backgroundColor: "black",
              borderRadius: 999,
            }}
          />
        )}
      </View>
      <View
        style={{
          width: "100%",

          paddingTop: height / 8,
          alignItems: "center",
          height: height / 24,
        }}
      >
        {(emoji === "Default" || emoji === "Normal") && (
          <View
            style={{
              width: width / 3,
              height: height / 24,
              backgroundColor: "black",
              borderRadius: 999,
            }}
          />
        )}
        {emoji === "Sad" && (
          <Canvas
            style={{
              height: height / 3,
              width: width / 1.5,
              position: "absolute",
              top: 4,
            }}
          >
            <Group>
              <Path
                path={sadPath}
                color="black"
                style="stroke"
                strokeWidth={height / 24}
              />
            </Group>
          </Canvas>
        )}
        {emoji === "Happy" && (
          <Canvas
            style={{
              height: height / 3,
              width: width / 1.5,
              position: "absolute",
              top: 4,
            }}
          >
            <Group>
              <Path
                path={happyPath}
                color="black"
                style="stroke"
                strokeWidth={height / 24}
              />
            </Group>
          </Canvas>
        )}
        {emoji === "Good" && (
          <Canvas
            style={{
              height: height / 3,
              width: width / 1.5,
              position: "absolute",
              top: 4,
            }}
          >
            <Group>
              <Path
                path={goodPath}
                color="black"
                style="stroke"
                strokeWidth={height / 24}
              />
            </Group>
          </Canvas>
        )}
        {emoji === "Default" && (
          <View
            style={{
              width: width / 6,
              height: height / 8,
              backgroundColor: "black",
              position: "absolute",
              bottom: -(height / 6),
              borderBottomLeftRadius: 999,
              borderBottomRightRadius: 999,
            }}
          />
        )}
      </View>
    </Animated.View>
  );
};
