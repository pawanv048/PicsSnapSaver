// Example to Get Device Information in React Native
// https://aboutreact.com/react-native-device-info/

// import React in our code

import React from 'react';

// import all the components we are going to use
import { View, StyleSheet, Text } from 'react-native';

import DeviceInfo from 'react-native-device-info';

const DeviceInfoConstants = (props) => {
  let deviceJSON = {};
  // deviceJSON.uniqueId = DeviceInfo.getUniqueId();
  // deviceJSON.deviceId = DeviceInfo.getDeviceId();
  // deviceJSON.bundleId = DeviceInfo.getBundleId();
  // deviceJSON.systemName = DeviceInfo.getSystemName();
  // deviceJSON.systemVersion = DeviceInfo.getSystemVersion();
  deviceJSON.v = DeviceInfo.getVersion();
  // deviceJSON.readableVersion = DeviceInfo.getReadableVersion();
  // deviceJSON.buildNumber = DeviceInfo.getBuildNumber();
  // deviceJSON.isTablet = DeviceInfo.isTablet();
  // deviceJSON.appName = DeviceInfo.getApplicationName();
  // deviceJSON.brand = DeviceInfo.getBrand();
  // deviceJSON.model = DeviceInfo.getModel();
  // deviceJSON.deviceType = DeviceInfo.getDeviceType();

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.instructions}>
        v {deviceJSON?.v}
      </Text>
    </View>
  );
};
export default DeviceInfoConstants;

const styles = StyleSheet.create({
  // titleStyle: {
  //   fontSize: 20,
  //   textAlign: 'center',
  //   margin: 10,
  // },
  instructions: {
    fontFamily: 'FjallaOne-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#221087',
    lineHeight:28,
    // margin: 50,
  },
});