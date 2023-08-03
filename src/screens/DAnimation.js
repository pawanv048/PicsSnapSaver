import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { signOutUser } from '../utils/authUtils'
const DAnimation = () => {

  const handleLogout = () => {
    try {
      signOutUser()
      console.log('logout')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>DAnimation</Text>
      <Button title='Logout' onPress={handleLogout}/>
    </View>
  )
}

export default DAnimation

const styles = StyleSheet.create({})