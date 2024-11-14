import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Canvas,
  Rect,
  LinearGradient,
  Skia,
  Shader,
  vec,
  RadialGradient,
  interpolateColors,
} from "@shopify/react-native-skia";
import { Default } from "../components/Home/Emojis/Default";
import { Pulse } from "../components/Home/Pulse";
import Animated, {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

export default function Home() {
  const bottomTabHeight = useBottomTabBarHeight();
  console.log(
    "🚀 ~ file: Home.tsx:7 ~ Home ~ bottomTabHeight:",
    bottomTabHeight
  );
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation<any>();
  const [focused, setFocused] = React.useState(false);
  const [selected, setSelected] = React.useState("Default");
  const [prevSelected, setPrevSelected] = React.useState("Default");
  const currentColor = useSharedValue("black");
  const previousColor = useSharedValue("black");
  const colorsIndex = useSharedValue(0);
  useEffect(() => {
    currentColor.value = getColorBySelected(selected);
    previousColor.value = getColorBySelected(prevSelected);
  }, [selected]);
  const vibrateAnimatedEnd = () => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };
    ReactNativeHapticFeedback.trigger("soft", options);
  };

  const handlePress = (val: string) => {
    setPrevSelected(selected);
    setSelected(val);
    vibrateAnimatedEnd();
  };
  useAnimatedReaction(
    () => {
      return {
        selected,
      };
    },
    ({ selected }) => {
      switch (selected) {
        case "Sad":
          colorsIndex.value = withTiming(1, {
            duration: 400,
          });
          break;
        case "Normal":
          colorsIndex.value = withTiming(2, {
            duration: 400,
          });
          break;
        case "Good":
          colorsIndex.value = withTiming(3, {
            duration: 400,
          });
          break;
        case "Happy":
          colorsIndex.value = withTiming(4, {
            duration: 400,
          });
          break;
        default:
          colorsIndex.value = withTiming(0, {
            duration: 400,
          });
      }
    }
  );

  const getColorBySelected = (selected: string) => {
    switch (selected) {
      case "Sad":
        return "#FF6B6BFF";
      case "Normal":
        return "#E668FFFF";
      case "Good":
        return "#B3FF00FF";
      case "Happy":
        return "#FBFF00FF";
      default:
        return "white";
    }
  };

  const gradientColors = useDerivedValue(() => {
    return [
      "black",
      interpolateColors(
        colorsIndex.value,
        [0, 1, 2, 3, 4],
        ["#FFFFFF8F", "#FF6B6B8A", "#E668FFBC", "#B3FF00A6", "#FBFF0099"]
      ),
    ];
  }, [currentColor, previousColor]);
  return (
    <View style={{ flex: 1 }}>
      {/* <LinearGradient
        // Background Linear Gradient
        colors={["#000000", "#5F5F5FFF"]}
        style={styles.background}
        dither
        start={{ x: 0, y: 0 }}
        locations={[0.1, 0.7]}
        end={{ x: 2, y: 3 }}
      > */}
      <View
        style={{ flex: 1, position: "absolute", height: "100%", width: "100%" }}
      >
        <Canvas style={{ flex: 1 }}>
          <Rect x={0} y={0} width={width} height={height + 40}>
            <LinearGradient
              start={vec(width / 2, height / 2)}
              end={vec(width, height/0.8)}
              colors={gradientColors}
            />
          </Rect>
        </Canvas>
      </View>
      <View style={{ padding: 20, paddingTop: 40 }}>
        <Text
          style={{ color: "white", fontFamily: "satoshi-bold", fontSize: 30 }}
        >
          How do you feel{"\n"}Today?
        </Text>

        {selected && (
          <Animated.View
            key={selected}
            exiting={ZoomOut.springify()}
            entering={ZoomIn.springify()}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              height: height / 2,
            }}
          >
            <View style={{ position: "absolute" }}>
              <Pulse
                width={120}
                height={120}
                color={getColorBySelected(selected)}
              />
            </View>
            <Default
              width={120}
              height={120}
              color={getColorBySelected(selected)}
              emoji={selected}
            />
          </Animated.View>
        )}
        <View />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <Default
            width={50}
            height={50}
            color="white"
            emoji="Default"
            isSelected={selected === "Default"}
            onSelect={() => {
              handlePress("Default");
            }}
          /> */}
          <Default
            width={50}
            height={50}
            color="#FF6B6BFF"
            emoji="Sad"
            isSelected={selected === "Sad"}
            onSelect={() => {
              handlePress("Sad");
            }}
          />
          <Default
            width={50}
            height={50}
            color="#E668FFFF"
            emoji="Normal"
            isSelected={selected === "Normal"}
            onSelect={() => {
              handlePress("Normal");
            }}
          />
          <Default
            width={50}
            height={50}
            color="#B3FF00FF"
            emoji="Good"
            isSelected={selected === "Good"}
            onSelect={() => {
              handlePress("Good");
            }}
          />
          <Default
            width={50}
            height={50}
            color="#FBFF00FF"
            emoji="Happy"
            isSelected={selected === "Happy"}
            onSelect={() => {
              handlePress("Happy");
            }}
          />
        </View>
      </View>
      {/* </View>
      </LinearGradient> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    padding: 20,
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
