import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {UserDetailProvider} from './src/helper/userDetail';
import {ThemeContext} from './src/helper/ThemeContext';
import {Appearance} from 'react-native';
import AsyncStorage from './src/utils/storage';

const App = () => {
  const [theme, setTheme] = useState({mode: 'dark'});

  const updateTheme = newTheme => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === 'dark' ? 'light' : 'dark';
      newTheme = {mode};
    } else {
      if (newTheme.system) {
        const systemColorScheme = Appearance.getColorScheme();
        mode = systemColorScheme == 'dark' ? 'dark' : 'light';

        newTheme = {...newTheme, mode};
      } else {
        newTheme = {...newTheme, system: false};
      }
    }
    setTheme(newTheme);
  };

  /// monitor system for theme change
  if (theme.system) {
    Appearance.addChangeListener(({colorScheme}) => {
      updateTheme({ system: true, mode: colorScheme})
    });
  }

  return (
    <UserDetailProvider>
      <ThemeContext.Provider value={{theme, updateTheme}}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeContext.Provider>
    </UserDetailProvider>
  );
};

export default App;
