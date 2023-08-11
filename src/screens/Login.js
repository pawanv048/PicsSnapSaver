import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Pressable, View, ToastAndroid } from 'react-native';
import { GButton, GInput, GText, } from '../components';
import icons from '../constants/icons';
import { sizes, colors } from '../constants/theme';
import { LoginWithEmailAndPassword } from '../utils/authUtils';
import { useUserDetail } from '../helper/userDetail';
import AsyncStorage from '../utils/storage';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import DeviceInfoConstants from '../utils/DeviceInfoConstants';


const Login = ({ navigation }) => {

  
  const { name, email, setEmail, setName } = useUserDetail()
  // console.log('email:', email)
  const [password, setPassword] = useState('')
  // console.log('password:', password)
  const [showErrors, setShowErrors] = useState(false)
  const [error, setError] = useState('')

  const getErrors = (email, password) => {
    const error = {}

    if (!email) {
      error.email = 'Please Enter Email';
    } else if (!email.includes("@") || !email.includes('.com')) {
      error.email = 'Please Enter Valid Email'
    }

    if (!password) {
      error.password = 'Please Enter Password'
    } else if (password.length < 5) {
      error.password = 'Please Enter AtLeast 8 Characters'
    }

    return error;
  }

  const handleRegister = () => {
    const error = getErrors(email, password)

    if (Object.keys(error).length > 0) {
      setShowErrors(true)
      setError(showErrors && error)
      console.log(error)
    } else {
      console.log('Login')
      setError({})
      setShowErrors(false)
      AsyncStorage.set('email', email);
      AsyncStorage.set('name', name);
      handleLogin({ email: email, password: password })
      //navigation.navigate('MainStack', { screen: 'home' })
    }
  }

  const handleLogin = ({ email, password }) => {
    LoginWithEmailAndPassword({ email, password }).then((res) => {
      console.log(res)
      const name = res.user.displayName
      setName(name)
      ToastAndroid.show("Logged In", ToastAndroid.SHORT)
    }).catch((e) => {
      if(e.code === 'auth/invalid-email'){
        setError({})
      }
      if (e.code === 'auth/user-not-found') {
        setError({ email: 'User not found' })
      }
      if (e.code === 'auth/wrong-password') {
        setError({ password: 'wrong password' })
      }
    })
  }


  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.loginContainer}>
        <View style={{ marginTop: '25%', }}>
          <GText
            text='Welcome Back!'
            style={{
              alignSelf: 'center',
              fontSize: 30,
              fontWeight: '600',
              color: colors.purple
            }}
          />
          <View style={{ marginVertical: sizes.radius * 2 }}>
            <GInput
              source={icons.iuser}
              placeholder='Email'
              autoFocus
              // value={email}
              onChangeText={e => setEmail(e)}
            />
            {error.email && (
              <GText text={error.email} style={{ color: colors.warning, marginLeft: sizes.radius }} />
            )}
            <GInput
              source={icons.ilock}
              placeholder='Password'
              secureTextEntry
              // value={password}
              onChangeText={e => setPassword(e)}
              maxLength={10}
            />
            {error.password && (
              <GText text={error.password} style={{ color: colors.warning, marginLeft: sizes.radius }} />
            )}
            <Pressable onPress={() => navigation.navigate('forgot')}>
              {/* animation  forgot*/}
              <GText
                text='Forgot Password?'
                style={{
                  alignSelf: 'flex-end',
                  color: colors.purple,
                  fontSize: 20
                }}
              />
            </Pressable>

            <GButton
              title='Login'
              onPress={handleRegister}
              style={{
                alignSelf: 'center',
                marginTop: sizes.radius * 2,

              }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', bottom: 50 }}>
          <GText
            text={`Don't have an account?`}
            style={{
              fontSize: 20
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <GText
              text={`Create new`}
              style={{
                color: colors.purple,
                fontWeight: '500',
                fontSize: 20
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
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

