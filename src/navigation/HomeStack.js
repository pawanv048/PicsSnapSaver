import * as React from 'react';
import {Home, DetailPic, PhotoCategories, Profile} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="detail" component={DetailPic} />
      <Stack.Screen name="categories" component={PhotoCategories} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
