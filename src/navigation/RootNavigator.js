import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { AuthStack } from './AuthStack';
import { HomeStack } from './HomeStack';


const Root = createStackNavigator();
const RootNavigator = () => {

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Root.Screen name="LoginStack" component={AuthStack} />
      <Root.Screen name="MainStack" component={HomeStack} />
    </Root.Navigator>
  )
}

export default RootNavigator
