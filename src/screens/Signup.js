import React, { useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { StyleSheet, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';
import { GButton, GInput, GText } from '../components';
import GSocialButton from '../components/GSocialButton';
import icons from '../constants/icons';
import { sizes, colors } from '../constants/theme';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { CreateAccountWithEmailAndPassword } from '../utils/authUtils';

const Signup = ({ navigation }) => {

const [name, setName] = useState('');
// console.log('Name:', name)
const [email, setEmail] = useState('') 
// console.log('email:', email)
const [password, setPassword] = useState('')
// console.log('password:', password)
const [showErrors, setShowErrors] = useState(false)
const [error, setError] = useState('')

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

  const getErrors = (name, email, password) => {
    const error = {}
    if(!name){
      error.name = 'Please Enter Name';
    }else if(name.length < 3){
      error.name = 'Please Enter AtLeast 3 Character'
    }

    if(!email){
      error.email = 'Please Enter Email';
    }else if(!email.includes("@") || !email.includes('.com') || !email.includes('.com')){
      error.email = 'Please Enter Valid Email'
    }

    if(!password){
      error.password = 'Please Enter Password'
    } else if(password.length < 6){
      error.password = 'Please Enter AtLeast 8 Characters'
    }

    return error;
  }
 
  const handleRegister = () => {
    const error = getErrors(name, email, password)

    if (Object.keys(error).length > 0) {
      setShowErrors(true)
      setError(showErrors && error)
      console.log(error)
    } else {
      setError({})
      setShowErrors(false)
      handleSignIn(email, password)
    }
  }

  const handleSignIn = (email, password) => {
    CreateAccountWithEmailAndPassword({email, password}).then(() => {
      ToastAndroid.show("Account Created", ToastAndroid.SHORT)
    }).catch(error => {
      if(error.code === 'auth/email-already-in-use'){
        return setError({email: 'Email already in use'})
      }
      if(error.code === 'auth/invalid-email'){
        return setError({email: 'Invalid Email'})
      }
      setError({})
      setShowErrors(false)
      console.log(error)
    })
  }

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.loginContainer}>
        <View style={{ marginTop: '20%', }}>
          <GText
            text='Create Account'
            style={{
              alignSelf: 'center',
              fontSize: 30,
              fontWeight: '600'
            }}
          />
          <View style={{ marginVertical: sizes.radius * 2 }}>
            <GInput
              source={icons.iuser}
              value={name}
              onChangeText={(e) => setName(e)}
              placeholder='Name'
            />
            {error.name && (
              <GText text={error.name} style={{color: colors.warning, marginLeft: sizes.radius}}/>
            )}
            <GInput
              source={icons.iemail}
              value={email}
              placeholder='Email'
              keyboardType='email-address'
              onChangeText={(e) => setEmail(e)}

            />
            {error.email && (
              <GText text={error.email} style={{color: colors.warning, marginLeft: sizes.radius}}/>
            )}
            <GInput
              source={icons.ilock}
              placeholder='Password'
              secureTextEntry
              value={password}
              onChangeText={(e) => setPassword(e)}
              maxLength={10}
            />
            {error.password && (
              <GText text={error.password} style={{color: colors.warning, marginLeft: sizes.radius}}/>
            )}
            <GButton
              title='Sign up'
              onPress={handleRegister}
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
            style={{
              fontSize: 20,
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <GText
              text={`Login In`}
              style={{
                color: colors.purple,
                fontWeight: '500',
                fontSize: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        <GSocialButton onPress={signIn} />
      </View>
    </KeyboardAvoidingWrapper>
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