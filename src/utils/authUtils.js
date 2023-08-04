import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const CreateAccountWithEmailAndPassword = ({email, password}) => {
 return auth().createUserWithEmailAndPassword(email, password)
}
export const LoginWithEmailAndPassword = ({email, password}) => {
 return auth().signInWithEmailAndPassword(email, password)
}

export const ResetPassword = ({email}) => {
  return auth().sendPasswordResetEmail(email)
 }

export const signOutUser = () => {
  return auth().signOut()
}


export const googleLogin = async (callback) => {
    GoogleSignin.configure();
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('photo: ' + userInfo.user.photo);
        console.log("id: " + userInfo.user.id);
        console.log("name: " + userInfo.user.name);
        console.log("email: " + userInfo.user.email);
        callback(userInfo.user);
    } catch (error) {
        console.log("error: " + error.code);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            // some other error happened
        }
    }
};