import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { sizes } from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import icons from '../constants/icons';



const GSocialButton = ({onPress}) => {
  return (
    <View style={{marginHorizontal: sizes.radius * 4}}>
      <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
        colors={['#221087', '#4F10B2', '#7B10D4']}
        style={styles.googleButton}
      >
        <Image
          style={styles.googleIcon}
          source={icons.iGoogle}
        />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default GSocialButton

const styles = StyleSheet.create({
  
   googleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
   },
   googleButtonText: {
    marginLeft: 16,
    fontSize: 12,
    fontWeight: '500'
   },
   googleIcon: {
    height: 25,
    width: 25
   }
})