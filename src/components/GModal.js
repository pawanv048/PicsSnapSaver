import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { colors, sizes } from '../constants/theme';
import GText from './GText';
import { introduction, personalizedDescriptions, offlineAccessibility, userAuthentication } from '../constants/strings';
import icons from '../constants/icons';


const GModal = ({ isVisible, onClose }) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
       
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <GText g1 text='About' style={{ alignSelf: 'center', marginTop: sizes.radius, color: colors.purple }} />
            <TouchableOpacity
              onPress={onClose}
              style={{ position: 'absolute', right: 10, top: 10 }} >
              <Image
                source={icons.icross}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: colors.gray
                }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ padding: sizes.radius * 2 }}
            contentContainerStyle={{ paddingBottom: sizes.radius * 5 }}>
            <GText text={introduction} />
            <GText text={personalizedDescriptions} />
            <GText text={offlineAccessibility} />
            <GText text={userAuthentication} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    width: sizes.width - 100,
    height: '70%',
    borderRadius: sizes.radius
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default GModal;
