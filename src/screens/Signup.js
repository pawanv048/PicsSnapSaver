import React, { useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { GButton, GInput, GText } from '../components';
import GSocialButton from '../components/GSocialButton';
import icons from '../constants/icons';
import { sizes, colors } from '../constants/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Signup = ({ navigation }) => {

  useEffect(() => {
    GoogleSignin.configure()
  }, [])


  // Somewhere in your code
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setState({ userInfo });
      console.log('user details', userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error)
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error)
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error)
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.loginContainer}>
        <View style={{ marginTop: '25%', }}>
          <GText
            text='Create Account'
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: '600'
            }}
          />
          <View style={{ marginVertical: sizes.radius * 2 }}>
            <GInput
              source={icons.iuser}
              placeholder='Name'
            />
            <GInput
              source={icons.iemail}
              placeholder='Email'
              secureTextEntry
            />
            <GInput
              source={icons.ilock}
              placeholder='Password'
              secureTextEntry
            />
            <GButton
              title='Sign up'
              style={{
                alignSelf: 'center',
                marginTop: sizes.radius * 2
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', position: 'absolute', alignSelf: 'center', bottom: 20 }}>
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
        <GSocialButton onPress={signIn} />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signup

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: sizes.radius * 2,
    backgroundColor: 'white',
    height: sizes.height
  },
})