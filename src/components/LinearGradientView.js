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
        theme.mode === 'dark' ? [ '#014871','#4E65FF', '#92EFFD'] : ['#221087', '#4F10B2', '#7B10D4']
      }>
      {children}
    </LinearGradient>
  );
};
//['#221087', '#4F10B2', '#7B10D4']
//['#4E65FF', '#92EFFD']
export default LinearGradientView;
