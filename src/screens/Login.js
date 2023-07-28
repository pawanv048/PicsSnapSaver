import React from 'react';
import { StyleSheet, TouchableOpacity, Pressable, View } from 'react-native';
import { GButton, GInput, GText, } from '../components';
import icons from '../constants/icons';
import { sizes, colors } from '../constants/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      contentInsetAdjustmentBehavior='automatic'
      automaticallyAdjustContentInsets={false}
      showsVerticalScrollIndicator={false}
      // extraScrollHeight={100}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={styles.loginContainer}>
        <View style={{ marginTop: '25%', }}>
          <GText
            text='Welcome Back!'
            style={{
              alignSelf: 'center',
              fontSize: 20,
              fontWeight: '600',
            }}
          />
          <View style={{ marginVertical: sizes.radius * 2 }}>
            <GInput
              source={icons.iuser}
              placeholder='Email'
              autoFocus
            />
            <GInput
              source={icons.ilock}
              placeholder='Password'
              secureTextEntry
            />
            <Pressable onPress={() => navigation.navigate('forgot')}>
              <GText g2 text='Forgot Password?' style={{ alignSelf: 'flex-end', color: colors.purple }} />
            </Pressable>

            <GButton
              title='Login'
              onPress={() => navigation.navigate('MainStack', { screen: 'home' })}
              style={{
                alignSelf: 'center',
                marginTop: sizes.radius * 2
              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 50 }}>
          <GText
            text={`Don't have an account?`}
          />
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <GText
              text={`Create new`}
              style={{
                color: colors.purple,
                fontWeight: '500',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    height: sizes.height,
    padding: sizes.radius * 2,
    backgroundColor: 'white'
  },

})