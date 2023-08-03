import React from 'react';
import { StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { GButton, GInput, GText } from '../components';
import icons from '../constants/icons';
import { sizes, colors } from '../constants/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';


const Forgot = ({ navigation }) => {
  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.loginContainer}>
        <GText
          text='Reset Password'
          style={{
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: '600'
          }} />
        <View style={{ marginVertical: sizes.radius * 2 }}>
          <GText
            text='An email with otp will be send to you'
            style={{
              alignSelf: 'center',
              fontSize: 20
            }} />
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


        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: '45%' }}>
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
                fontSize: 20
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  )
}

export default Forgot

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: sizes.radius * 2,
    backgroundColor: 'white',
    paddingTop: '25%',

  },
})