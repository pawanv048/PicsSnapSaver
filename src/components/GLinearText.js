import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GLinearText = ({title}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#221087', '#4F10B2', '#7B10D4']}
      style={[styles.buttonContainer]}>
      <Text style={styles.buttonTxt}>{title}</Text>
    </LinearGradient>
  );
};

export default GLinearText;

var styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 5,
    width: '100%',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '300',
    fontFamily: 'Caveat-Bold',
    // fontFamily: 'Roboto-Black',
    // letterSpacing: 1.5
  },
});
