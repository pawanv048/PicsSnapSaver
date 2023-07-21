import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GMasonryList from '../components/GMasonryList'

const Home = () => {
  return (
    <View style={{flex: 1}}>
      <GMasonryList/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})