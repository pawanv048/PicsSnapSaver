import React, { useState, useEffect } from 'react'
import { Modal, StyleSheet, Image, View, Pressable, Alert, Text, ScrollView } from 'react-native';
import { signOutUser } from '../utils/authUtils';
import LinearGradient from 'react-native-linear-gradient';
import icons from '../constants/icons';
import { GButton, GText } from '../components';
import { colors, sizes } from '../constants/theme';
import { Terms } from '../constants/strings';
import { useUserDetail } from '../helper/userDetail';
import AsyncStorage from '../utils/storage';

const Profile = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const {name, email, setName, setEmail} = useUserDetail()


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

      {/* USER DETAILS */}
      <View style={{ paddingHorizontal: sizes.radius * 2, marginTop: sizes.radius * 2 }}>
        <CustomView source={icons.iemail} text={email} />
        <CustomView source={icons.iuser} text={name} />
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <CustomView source={icons.iTerms} text={'terms&condition'} />
        </Pressable>
        <GButton
          style={{
            alignSelf: 'center',
            marginTop: sizes.radius * 3
          }}
          title='Logout'
          onPress={handleLogout}
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Terms & Condition</Text>
            <ScrollView
              onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  setAccepted(true);
                }
              }}
            >
             <Text>Welcome to our App. If you continue to browse and use this app, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [business name]’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.</Text>
            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
};


