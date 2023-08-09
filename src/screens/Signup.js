import React, { useEffect, useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { StyleSheet, TouchableOpacity, View, Modal, ScrollView, Text, Pressable, ToastAndroid } from 'react-native';
import { GButton, GInput, GText } from '../components';
import GSocialButton from '../components/GSocialButton';
import icons from '../constants/icons';
import { sizes, colors } from '../constants/theme';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { CreateAccountWithEmailAndPassword, googleLogin } from '../utils/authUtils';
import { useUserDetail } from '../helper/userDetail';
import AsyncStorage from '../utils/storage';
import { terms } from '../constants/strings';

const Signup = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const { name, email, setEmail, setName } = useUserDetail();
  const [password, setPassword] = useState('')
  const [showErrors, setShowErrors] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState('')


  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const getErrors = (name, email, password, accepted) => {
    const error = {}
    if (!name) {
      error.name = 'Please Enter Name';
    } else if (name.length < 3) {
      error.name = 'Please Enter AtLeast 3 Character'
    }

    if (!email) {
      error.email = 'Please Enter Email';
    } else if (!email.includes("@") || !email.includes('.com')) {
      error.email = 'Please Enter Valid Email'
    }

    if (!password) {
      error.password = 'Please Enter Password'
    } else if (password.length < 6) {
      error.password = 'Please Enter AtLeast 8 Characters'
    }
    if(accepted === false){
      error.accepted = ToastAndroid.show('Please accept Terms & condition', ToastAndroid.SHORT)
    }
    return error;
  };

  const handleRegister = () => {
    const error = getErrors(name, email, password, accepted)

    if (Object.keys(error).length > 0) {
      setShowErrors(true)
      setError(showErrors && error)
      console.log(error)
    } else {
      setError({})
      setShowErrors(false)
      // Store name and email in AsyncStorage before calling handleSignIn
      AsyncStorage.set('name', name);
      AsyncStorage.set('email', email);

      handleSignIn(email, password)
    }
  };

  const handleSignIn = (email, password) => {
    CreateAccountWithEmailAndPassword({ email, password }).then((res) => {
      const updateName = res.user.updateProfile({
        displayName: name
      })
      console.log('name name=>', updateName)
      ToastAndroid.show("Account Created", ToastAndroid.SHORT)
    }).catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        return setError({ email: 'Email already in use' })
      }
      if (error.code === 'auth/invalid-email') {
        return setError({ email: 'Invalid Email' })
      }
      setError({})
      setShowErrors(false)
      console.log(error)
    })
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.loginContainer}>
        <View style={{ marginTop: '20%', }}>
          <GText
            text='Create Account'
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
              // value={name}
              onChangeText={(e) => setName(e)}
              placeholder='Name'
            />
            {error.name && (
              <GText text={error.name} style={{ color: colors.warning, marginLeft: sizes.radius }} />
            )}
            <GInput
              source={icons.iemail}
              // value={email}
              placeholder='Email'
              keyboardType='email-address'
              onChangeText={(e) => setEmail(e)}

            />
            {error.email && (
              <GText text={error.email} style={{ color: colors.warning, marginLeft: sizes.radius }} />
            )}
            <GInput
              source={icons.ilock}
              placeholder='Password'
              secureTextEntry
              // value={password}
              onChangeText={(e) => setPassword(e)}
              maxLength={10}
            />
            {error.password && (
              <GText text={error.password} style={{ color: colors.warning, marginLeft: sizes.radius }} />
            )}
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <GText text='Terms&Condition' style={{ color: colors.purple, alignSelf: 'center' }} />
            </TouchableOpacity>
            <GButton
              title='Sign up'
              onPress={handleRegister}
              style={{
                alignSelf: 'center',
                marginTop: sizes.radius * 2
              }}
            />
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.container}>
              <View style={styles.modalView}>
                <GText g1 text='Terms and Condition' style={{ marginBottom: sizes.radius }} />
                <ScrollView
                  onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                      setAccepted(true);
                      // console.log("Accepted State:", accepted);
                    }
                  }} >
                  <Text>{terms}</Text>
                </ScrollView>
                <TouchableOpacity
                  disabled={!accepted}
                  onPress={() => setModalVisible(!modalVisible)}
                  style={accepted ? styles.button : styles.buttonDisabled}>
                  <Text style={styles.buttonLabel}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>


        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            alignSelf: 'center',
            bottom: 40
          }}>
          <GText
            text={`Already have an account?`}
            style={{ fontSize: 20}} />
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
        <GSocialButton onPress={googleLogin} />
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
  modalView: {
    margin: sizes.radius * 3,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: sizes.height / 1.2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center'
  }
})