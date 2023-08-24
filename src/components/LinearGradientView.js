import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../helper/ThemeContext';
import {colors} from '../constants/theme';

const LinearGradientView = ({style, start, locations, end, children}) => {
  const {theme, updateTheme} = useContext(ThemeContext);
  const activeColor = colors[theme.mode];
  return (
    <LinearGradient
      style={style}
      start={start}
      end={end}
      locations={locations}
      colors={
        theme.mode === 'dark' ? ['#014871', '#d7ede2'] : ['#4E65FF', '#92EFFD']
      }>
      {children}
    </LinearGradient>
  );
};

export default LinearGradientView;
