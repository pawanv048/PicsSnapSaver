import React, {useEffect, useState} from 'react';
import {
  Home,
  DetailPic,
  PhotoCategories,
  Profile,
  Walkthrough,
  Welcome,
  Walkthrough1,
  Walkthrough2,
} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '../utils/storage';

const Stack = createStackNavigator();

export function HomeStack() {
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.get('appLaunched');
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.set('appLaunched', 'false');
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  return (
    firstLaunch != null && (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {firstLaunch ? (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="walkthrough" component={Walkthrough} />
            <Stack.Screen name="Walkthrough1" component={Walkthrough1} />
            <Stack.Screen name="Walkthrough2" component={Walkthrough2} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="detail" component={DetailPic} />
            <Stack.Screen name="categories" component={PhotoCategories} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="walkthrough" component={Walkthrough} />
            <Stack.Screen name="Walkthrough1" component={Walkthrough1} />
            <Stack.Screen name="Walkthrough2" component={Walkthrough2} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="detail" component={DetailPic} />
            <Stack.Screen name="categories" component={PhotoCategories} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        )}
        {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
      </Stack.Navigator>
    )
  );
}
