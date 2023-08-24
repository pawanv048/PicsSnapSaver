import React, {useState, useEffect, useContext} from 'react';
import {
  Modal,
  StyleSheet,
  Image,
  View,
  Pressable,
  Button,
  ScrollView,
  StatusBar,
  Alert,
  Linking,
  Switch,
} from 'react-native';
import {signOutUser} from '../utils/authUtils';
import LinearGradient from 'react-native-linear-gradient';
import icons from '../constants/icons';
import {GButton, GModal, GText, LinearGradientView} from '../components';
import {colors, sizes} from '../constants/theme';
import {useUserDetail} from '../helper/userDetail';
import AsyncStorage from '../utils/storage';
import {ThemeContext} from '../helper/ThemeContext';
import DeviceInfoConstants from '../utils/DeviceInfoConstants';
import {PRIVACY_POLICY_URL} from '../constants/Constants';

const Profile = ({navigation}) => {
  const [aboutModal, setAboutModal] = useState(false);

  const {theme, updateTheme} = useContext(ThemeContext);

  const {name, email, setName, setEmail} = useUserDetail();
  // SHOW ABOUT SECTION

  const activeColor = colors[theme.mode];
  const [isActive, setIsActive] = useState(theme.mode === 'dark');

  const toggleModal = () => {
    setAboutModal(!aboutModal);
  };

  // DISPLAYING USER NAME AND EMAIL

  useEffect(() => {
    // Fetch the name and email from AsyncStorage and update the state
    AsyncStorage.get('name').then(name => {
      if (name) {
        setName(name);
      }
    });
    AsyncStorage.get('email').then(email => {
      if (email) {
        setEmail(email);
      }
    });
  }, []);

  const toggleSwitch = () => {
    updateTheme();
    setIsActive(previousState => !previousState);
    // onToggleSwitch && onToggleSwitch(!isActive)
  };

  // LOGOUT

  const handleLogout = () => {
    try {
      Alert.alert(
        'Logout',
        'Are you sure, You want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Confirm',
            onPress: () => {
              signOutUser();
              console.log('logout');
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e0e9c', '#3725c2', '#4538a6']}
        style={{height: '30%'}}>
        <Pressable
          style={{
            backgroundColor: '#fff',
            margin: sizes.radius,
            marginTop: sizes.radius * 3,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => navigation.navigate('home')}>
          <Image
            source={icons.iback}
            style={{
              width: 20,
              height: 20,
              tintColor: colors.purple,
            }}
          />
        </Pressable>
      </LinearGradient>

      <LinearGradientView
        style={{
          paddingHorizontal: sizes.radius * 2,
          paddingVertical: sizes.radius * 5,
          marginTop: -sizes.radius * 3,
          margin: sizes.radius * 2,
          borderRadius: sizes.radius * 2,
        }}>
        <CustomView
          source={icons.iTerms}
          text={'About'}
          onPress={toggleModal}
        />

        <CustomView
          source={icons.iPrivacy}
          text={'Privacy & Policy'}
          onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
        />

        <CustomView
          source={icons.ithemeswitch}
          text={'Dark Mode'}
          active
          containerStyle={{justifyContent: 'space-between'}}
          value={isActive}
          onValueChange={toggleSwitch}
          trackColor={{false: 'rgb(159,159,159)', true: '#2192FF'}}
          thumbColor={'#f4f3f4'}
        />

        <CustomView
          source={icons.isystemtheme}
          text={'System'}
          isActive={theme.system}
          onPress={() => updateTheme({system: true})}
        />
      </LinearGradientView>

      {/* DEVICE VERSION */}
      <View style={{marginTop: 'auto', marginBottom: 100}}>
        <DeviceInfoConstants />
      </View>

      {/* OPEN ABOUT */}
      <GModal isVisible={aboutModal} onClose={toggleModal} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CustomView = props => {
  const {
    text,
    source,
    active,
    onPress,
    containerStyle,
    value,
    onValueChange,
    thumbColor,
    trackColor,
    isActive,

    ...allProps
  } = props;

  return (
    <Pressable
      onPress={onPress}
      style={{
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: sizes.radius,
        marginBottom: sizes.radius,
        borderRadius: 5,
        ...containerStyle,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={source}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
            tintColor: '#1e0e9c',
            resizeMode: 'contain',
            opacity: 0.8,
          }}
        />
        <GText text={text} style={{fontSize: 18, color: '#1e0e9c'}} />
      </View>
      {active ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          thumbColor={thumbColor}
          trackColor={trackColor}
          {...allProps}
        />
      ) : null}
    </Pressable>
  );
};

/**************/
{
  /* <GButton
          style={{
            alignSelf: 'center',
            marginTop: sizes.radius * 3
          }}
          title='Logout'
          onPress={handleLogout}
        /> */
}

{
  /* <View style={{ alignItems: 'center', marginTop: sizes.height * 0.25 * -0.3, }}>
         <Image
          source={icons.user}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: colors.gray,
            resizeMode: 'contain',
            tintColor: colors.lightGray,
            borderWidth: 2,
            borderColor: colors.purple
          }}
        /> 
      </View> */
}
