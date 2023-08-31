import React from 'react';
import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import icons from '../constants/icons';
import {LinearGradientView, TextButton} from '../components';
import {COLORS, FONTS, SIZES} from '../constants/theme';

const Welcome = ({navigation}) => {
  return (
    <LinearGradientView
      style={{
        flex: 1,
        // backgroundColor: COLORS.light,
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      {/* Logo & Title */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={icons.logo}
          style={{
            width: 150,
            height: 150,
            transform: [{rotate: '180deg'}],
          }}
        />

        <Text style={{marginTop: SIZES.padding, ...FONTS.h1}}>Welcome to</Text>
        <Text style={{marginTop: SIZES.base, ...FONTS.h1}}>WanderWalls</Text>
      </View>

      {/* Footer Buttons */}
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          marginBottom: 30,
        }}>
        <TextButton
          contentContainerStyle={{
            height: 50,
            borderRadius: SIZES.radius,
          }}
          label="Get Started"
          onPress={() => navigation.navigate('walkthrough')}
        />

        {/* <TextButton
                    contentContainerStyle={{
                        height: 50,
                        marginTop: SIZES.base,
                        backgroundColor: null
                    }}
                    label="Already have an account"
                    labelStyle={{
                        color: COLORS.primary
                    }}
                //onPress
                /> */}
      </View>
    </LinearGradientView>
  );
};

export default Welcome;
