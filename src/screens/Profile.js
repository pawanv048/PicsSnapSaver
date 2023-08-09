import React, { useState, useEffect } from 'react'
import { Modal, StyleSheet, Image, View, Pressable, Alert, Text, ScrollView } from 'react-native';
import { signOutUser } from '../utils/authUtils';
import LinearGradient from 'react-native-linear-gradient';
import icons from '../constants/icons';
import { GButton, GText } from '../components';
import { colors, sizes } from '../constants/theme';
import { useUserDetail } from '../helper/userDetail';
import AsyncStorage from '../utils/storage';

const Profile = ({ navigation }) => {

  const { name, email, setName, setEmail } = useUserDetail()


  useEffect(() => {
    // Fetch the name and email from AsyncStorage and update the state
    AsyncStorage.get('name').then((name) => {
      if (name) {
        setName(name);
      }
    });
    AsyncStorage.get('email').then((email) => {
      if (email) {
        setEmail(email);
      }
    });
  }, []);

  // Lougout function
  const handleLogout = () => {
    try {
      signOutUser()
      console.log('logout')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e0e9c', '#3725c2', '#4538a6',]}
        style={{ height: '30%' }}
      >
        <Pressable
          style={{
            backgroundColor: '#fff',
            margin: sizes.radius,
            marginTop: 30,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.iback}
            style={{
              width: 20,
              height: 20,
              tintColor: colors.purple
            }}
          />
        </Pressable>
      </LinearGradient>
      <View style={{ alignItems: 'center', marginTop: -50 }}>
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
      </View>

      <View style={{ paddingHorizontal: sizes.radius, marginTop: sizes.radius * 2 }}>
          <CustomView source={icons.iemail} text={email} />
          <CustomView source={icons.iuser} text={name} />
          <CustomView source={icons.iTerms} text={'terms&condition'} />
          <GButton
            style={{
              alignSelf: 'center',
              marginTop: sizes.radius * 3
            }}
            title='Logout'
            onPress={handleLogout}
          />
        </View>

    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },


})

const CustomView = ({ text, source }) => {
  return (
    <View
      style={{
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: sizes.radius,
        marginTop: sizes.radius,
        borderRadius: 5
      }}>
      <Image
        source={source}
        style={{
          width: 20,
          height: 20,
          marginRight: 10,
          tintColor: '#1e0e9c',
          resizeMode: 'contain'
        }}
      />
      <GText text={text} style={{ fontSize: 18, color: '#1e0e9c' }} />
    </View>
  )
}

