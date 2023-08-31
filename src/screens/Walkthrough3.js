import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

import {MotiImage, useDynamicAnimation, MotiView} from 'moti';
import {SIZES} from '../constants/theme';
import images from '../constants/images';

const Walkthrough3 = ({animate}) => {
  // Moti inital position
  const motiImage1 = useDynamicAnimation(() => ({
    top: '50%',
    left: '50%',
  }));
  const motiImage2 = useDynamicAnimation(() => ({
    top: '55%',
    left: '30%',
  }));
  const motiImage3 = useDynamicAnimation(() => ({
    top: '60%',
    left: '50%',
  }));
  const motiImage4 = useDynamicAnimation(() => ({
    top: '40%',
    left: '60%',
  }));


  useEffect(() => {
    if (animate) {
      motiImage1.animateTo({
        top: '15%',
        left: '20%',
      });

      motiImage2.animateTo({
        top: '50%',
        left: "15",
      });

      motiImage3.animateTo({
        top: '65%',
        left: '46%',
      });

      motiImage4.animateTo({
        top: '28%',
        left: '50%',
      });
    }
  }, [animate]);

  return (
    <View
      style={{
        flex: 1,
        overflow: 'hidden',
      }}>
      <MotiImage
        state={motiImage1}
        source={images.walkthrough_01_01}
        style={styles.image}
      />
      <MotiImage
        state={motiImage2}
        source={images.walkthrough_03_02}
        style={styles.image}
      />
      <MotiImage
        state={motiImage3}
        source={images.walkthrough_01_02}
        style={styles.image}
      />
      <MotiImage
        state={motiImage4}
        source={images.walkthrough_03_01}
        style={styles.image}
      />
      {/* <MotiImage
        state={motiImage2}
        source={images.walkthrough_03_02}
        style={styles.image}
      />
      <MotiImage
        state={motiImage3}
        source={images.walkthrough_01_02}
        style={styles.image}
      />
      <MotiImage
        state={motiImage4}
        source={images.walkthrough_03_01}
        style={styles.image}
      /> */}
     
    </View>
  );
};

export default Walkthrough3;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    width: 112,
    height: 112,
    zIndex: 0,
    borderRadius: SIZES.radius,
  },
});
