import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './src/navigation/HomeStack';
const App = () => {
  return (
    <NavigationContainer>
      <HomeStack/>
    </NavigationContainer>
  )
}

export default App