import * as React from 'react';
import {
  Home,
  DetailPic,
  PhotoCategories,
  Profile,
  Walkthrough,
  Welcome,
  Walkthrough1,
  Walkthrough2
} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="walkthrough" component={Walkthrough} />
      <Stack.Screen name="Walkthrough1" component={Walkthrough1} />
      <Stack.Screen name="Walkthrough2" component={Walkthrough2} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="detail" component={DetailPic} />
      <Stack.Screen name="categories" component={PhotoCategories} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
