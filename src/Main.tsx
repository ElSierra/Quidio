import { View, Text } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

export default function Main() {
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Main</Text>
    </Animated.View>
  );
}
