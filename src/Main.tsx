import { View, Text, useWindowDimensions } from "react-native";
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
import Home from "./Screens/Home";
import Explore from "./Screens/Explore";
import { PlatformPressable } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import {
  DiscoverIconFocused,
  DiscoverIconUnfocused,
  ExploreIcon,
  HomeFocused,
  HomeIcon,
  LikeIconFocused,
  LikeIconUnfocused,
  ProfileIconFocused,
  ProfileIconUnfocused,
} from "./components/global/icons";
import CustomTabBar from "./components/CustomTabBar";
import { AnimatedIcon } from "./components/CustomTabBar/AnimatedIcon";
import { Theme } from "./constants/Theme";
import { StatusBar } from "expo-status-bar";
import Likes from "./Screens/Likes";
import Profile from "./Screens/Profile";

const MyTabs = createBottomTabNavigator({
  tabBar: (props) => <CustomTabBar {...props} />,
  sceneContainerStyle: {
    backgroundColor: Theme.colors.background,
  },
  screenOptions: {
    headerShown: false,
    animation: "shift",
    //background color of page
  },
  screens: {
    Home: {
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <AnimatedIcon
            focused={focused}
            size={size}
            FocusedIcon={HomeFocused}
            UnfocusedIcon={HomeIcon}
          />
        ),
      },
      screen: Home,
    },
    Explore: {
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <AnimatedIcon
            focused={focused}
            size={size}
            FocusedIcon={DiscoverIconFocused}
            UnfocusedIcon={DiscoverIconUnfocused}
          />
        ),
      },
      screen: Explore,
    },
    Likes: {
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <AnimatedIcon
            focused={focused}
            size={size}
            FocusedIcon={LikeIconFocused}
            UnfocusedIcon={LikeIconUnfocused}
          />
        ),
      },
      screen: Likes,
    },

    Profile: {
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <AnimatedIcon
            focused={focused}
            size={size}
            FocusedIcon={ProfileIconFocused}
            UnfocusedIcon={ProfileIconUnfocused}
          />
        ),
      },
      screen: Profile,
    },
  },
});
const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    contentStyle: {
      backgroundColor: Theme.colors.background,
    },
  },

  screens: {
    Tabs: MyTabs,
  },
});

const Navigation = createStaticNavigation(RootStack);
export default function Main() {
  return (
    <>
      <StatusBar animated={true} style={"light"} backgroundColor="transparent" />
      <Navigation />
    </>
  );
}
