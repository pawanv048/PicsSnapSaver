import * as React from 'react';
import { Button, View } from 'react-native';
import { Home, MasonryDetail } from '../screens';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="masdetail" component={MasonryDetail} />
    </Stack.Navigator>
  );
}