import { View, Text, useWindowDimensions, Platform } from "react-native";
import React, { useLayoutEffect, useRef } from "react";
import Animated, {
  FadeIn,
  FadeInUp,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  createStaticNavigation,
  useLinkBuilder,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Theme } from "../../constants/Theme";
import { PlatformPressable } from "@react-navigation/elements";

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    const refs = useRef<(View | null)[]>([]);
    const { width: windowWidth } = useWindowDimensions();
    const [position, setPosition] = React.useState<
      {
        x: number;
        y: number;
        width: number;
        height: number;
        pageX: number;
        pageY: number;
      }[]
    >([]);
    console.log("🚀 ~ file: Main.tsx:23 ~ MyTabBar ~ position:", position);
  
    useLayoutEffect(() => {
      refs.current.forEach((ref) => {
        if (ref) {
          ref.measure((x, y, width, height, pageX, pageY) => {
            setPosition((prev) => [
              ...prev,
              { x, y, width, height, pageX, pageY },
            ]);
          });
        }
      });
    }, [refs.current]);
  
    const x = useSharedValue(0);
    const width = useSharedValue(0);
    const focusedIndex = state.index;
    const indicatorStyle = useAnimatedStyle(() => {
      0;
      return {
        transform: [{ translateX: x.value }],
        width: width.value,
      };
    });
  
    useAnimatedReaction(
      () => position,
      () => {
        if (position.length) {
  
          const indicatorWidth = position[focusedIndex].width / 3;
          x.value = withTiming(
            position[focusedIndex].x + position[focusedIndex].width / 2 - (indicatorWidth/2)
          );
          width.value = withTiming(indicatorWidth);
        }
      }
    );
    return (
      <View
        style={{
          flexDirection: "row",
          height: Platform.OS === "ios" ? 90 : 60,
          backgroundColor:Theme.colors.tabBg,
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <Animated.View
          style={[
            {
              width: "100%",
              borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              backgroundColor: Theme.colors.primary,
              position: "absolute",
              zIndex: 100,
              height: 5,
            },
            indicatorStyle,
          ]}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label: any =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
          const icon = options.tabBarIcon?.({
            focused: isFocused,
            color: isFocused ? colors.primary : colors.text,
            size: 24,
          });
  
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
  
          return (
            <View
              key={route.key}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
              ref={(el) => (refs.current[index] = el)}
            >
              <PlatformPressable
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                android_ripple={{ color: "transparent" }}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </View>
  
                {/* <Text style={{ color: isFocused ? colors.primary : colors.text }}>
                  {label}
                </Text> */}
              </PlatformPressable>
            </View>
          );
        })}
      </View>
    );
  }