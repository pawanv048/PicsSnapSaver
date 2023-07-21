import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'


const meso = 'https://images.unsplash.com/photo-1530553621687-a39a2ceaba2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=657&q=80'
const MasonryDetail = ({route}) => {

  const { image } = route?.params || {}
  // console.log('img ==>', image);
  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: image}}
        style={[StyleSheet.absoluteFillObject, ]}
      />
    </View>
  )
}

export default MasonryDetail

const styles = StyleSheet.create({})