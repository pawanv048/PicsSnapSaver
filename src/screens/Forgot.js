import React from 'react';
import { StyleSheet, TouchableOpacity,View } from 'react-native';
import { GButton, GInput, GText } from '../components';
import icons from '../constants/icons';
import { sizes, colors } from '../constants/theme';


const Forgot = ({navigation}) => {
  return (
    <View style={styles.loginContainer}>
      <View style={{ marginTop: '25%', }}>
        <GText
          text='Reset Password'
          style={{
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: '600'
          }}
        />
        <View style={{ marginVertical: sizes.radius * 2 }}>

        <GText
          text='An email with otp will be send to you'
          style={{
            alignSelf: 'center'
          }}
        />
          <GInput
            source={icons.iemail}
            placeholder='Email'
            secureTextEntry
          />
          <GButton
            title='Reset'
            style={{
              alignSelf: 'center',
              marginTop: sizes.radius * 2
            }}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'center', bottom: 40 }}>
        <GText
          text={`Already have an account?`}
        />
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <GText
            text={`Login In`}
            style={{
              color: colors.purple,
              fontWeight: '500',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Forgot

const styles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      padding: sizes.radius * 2,
      backgroundColor: 'white'
    },
})