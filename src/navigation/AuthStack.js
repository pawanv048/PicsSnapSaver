
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Forgot, Login, Signup } from '../screens';

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='login'>
      <Stack.Screen
        name='login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='signup'
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='forgot'
        component={Forgot}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  )
}
