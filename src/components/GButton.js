import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
// import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

// const Shimmer = createShimmerPlaceholder(LinearGradient);

const GButton = (props) => {
  const { title, onPress, style } = props
  return (
    // Within your render function
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={style}
    >
      <LinearGradient
        start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
        colors={['#221087', '#4F10B2', '#7B10D4']}
        style={[styles.buttonContainer]}
      >
        <Text style={styles.buttonTxt}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>

  )
}

export default GButton;

var styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTxt: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400'
  }
});




