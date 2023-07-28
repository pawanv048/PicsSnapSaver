import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';


const GSocialButton = ({onPress}) => {
  return (
    <View style={styles.bottomContent}>
      <TouchableOpacity style={styles.googleButton} onPress={onPress}>
        <Image
          style={styles.googleIcon}
          source={{
            uri: "https://i.ibb.co/j82DCcR/search.png",
          }}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GSocialButton

const styles = StyleSheet.create({
  bottomContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   },
   googleButton: {
    backgroundColor: "grey",
    borderRadius: 4,
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
   },
   googleButtonText: {
    marginLeft: 16,
    fontSize: 12,
    fontWeight: '500'
   },
   googleIcon: {
    height: 17,
    width: 17
   }
})