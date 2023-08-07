import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { UserDetailProvider } from './src/helper/userDetail';


const App = () => {
  return (
    <UserDetailProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UserDetailProvider>
  )
}

export default App