import { View, Text } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

export default function Home() {
    const bottomTabHeight = useBottomTabBarHeight()
    console.log("🚀 ~ file: Home.tsx:7 ~ Home ~ bottomTabHeight:", bottomTabHeight)

  return (
    <View style={{flex:1}}>
      <Text style={{position:"absolute",bottom:0}}>Home</Text>
    </View>
  )
}