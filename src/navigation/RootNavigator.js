import { createStackNavigator } from '@react-navigation/stack'
import React,{useState, useEffect} from 'react'
import { AuthStack } from './AuthStack';
import { HomeStack } from './HomeStack';
import auth from '@react-native-firebase/auth';


const RootNavigator = () => {
  
  const Root = createStackNavigator();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  console.log('initializing=>', initializing)
  const [user, setUser] = useState();
  console.log('user=>', user)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  }


  return (
    <Root.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>
      {user ? (
        <Root.Screen name="MainStack" component={HomeStack} />
      ) : (
        <Root.Screen name="LoginStack" component={AuthStack} />
      )}
    </Root.Navigator>
  )
}

export default RootNavigator
