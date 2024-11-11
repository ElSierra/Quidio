import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, Text, useWindowDimensions, Pressable } from "react-native";

export const BottomSheet = () => {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        animated={true}
        style={"light"}
        backgroundColor="transparent"
      />
      <View>
        <View
          style={{
         
            height: dimensions.height+60,
          }}
        ></View>
      </View>
    </>
  );
};
