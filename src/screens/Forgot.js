import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { GButton, GInput, GText } from '../components';
import icons from '../constants/icons';
import { sizes, colors } from '../constants/theme';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { ResetPassword } from '../utils/authUtils';


const Forgot = ({ navigation }) => {

  const [email, setEmail] = useState('') 
// console.log('email:', email)

const [showErrors, setShowErrors] = useState(false)
const [error, setError] = useState('')

  const getErrors = (email) => {
    const error = {}
    if(!email){
      error.email = 'Please Enter Email';
    }else if(!email.includes("@") || !email.includes('.com')){
      error.email = 'Please Enter Valid Email'
    }
    return error;
  };
 
  const handleRegister = () => {
    const error = getErrors(email)
    if (Object.keys(error).length > 0) {
      setShowErrors(true)
      setError(showErrors && error)
      console.log(error)
    } else {
      setError({})
      setShowErrors(false)
      handleForgotPassword({email: email})
      //navigation.navigate('MainStack', { screen: 'home' })
    }
  };

  const handleForgotPassword = ({email}) => {
    ResetPassword({email}).then(() => {
      ToastAndroid.show("Reset Link send on you mail", ToastAndroid.SHORT)
    }).catch((e) =>{
      console.log(e)
    })
  };


  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.loginContainer}>
        <GText
          text='Reset Password'
          style={{
            alignSelf: 'center',
            fontSize: 30,
            fontWeight: '600',
            color: colors.purple
          }} />
        <View style={{ marginVertical: sizes.radius * 2 }}>
          <GText
            text='An email with link will be send to you'
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: colors.purple
            }} />
          <GInput
            source={icons.iemail}
            placeholder='Email'
            value={email}
            onChangeText={e => setEmail(e)}
          />
          {error.email && (
              <GText text={error.email} style={{color: colors.warning, marginLeft: sizes.radius}}/>
            )}
          <GButton
            title='Reset'
            onPress={handleRegister}
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