import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
export default function Explore() {
  return (
    <View style={{flex:1}}>
    <Image
        style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
        src="https://images.pexels.com/photos/28271627/pexels-photo-28271627/free-photo-of-a-road-sign-on-a-barren-road-with-a-red-triangle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
    </View>
  )
}