import { StyleSheet, Text, View, Image } from "react-native";
import React,{useEffect} from "react";

import { MotiImage, useDynamicAnimation, MotiView } from "moti";
import { SIZES } from "../constants/theme";
import images from "../constants/images";

const Walkthrough4 = ({ animate }) => {
  // Moti inital position
  const motiImage1 = useDynamicAnimation(() => ({
    top: "30%",
    left: "25%",
  }));
  const motiImage2 = useDynamicAnimation(() => ({
    top: "45%",
    left: "15%",
  }));
  const motiImage3 = useDynamicAnimation(() => ({
    top: "58%",
    left: "25%",
  }));
  const motiImage5 = useDynamicAnimation(() => ({
    top: "27%",
    left: "50%",
  }));

  useEffect(() => {
    if(animate){
      motiImage1.animateTo({
        top: "15%",
        left: 80
      })

      motiImage2.animateTo({
        top: "38%",
        left: -10
      })

      motiImage3.animateTo({
        top: "70%",
        left: 85
      })

      motiImage5.animateTo({
        top: "15%",
        left: "65%"
      })
    }
  },[animate])

  return (
    <View style={{
      flex: 1,
      overflow: 'hidden'
    }}>
     <Image
      source={images.walkthrough_02_01}
      style={{
        ...styles.image,
        top: "30%",
        left: "30%",
        width: 160,
        height: 200,
        zIndex: 1
      }}
     />
      
     <MotiImage
      state={motiImage1}
      source={images.walkthrough_02_03}
      style={styles.image}
     />
     <MotiImage
      state={motiImage2}
      source={images.walkthrough_02_04}
      style={styles.image}
     />
     <MotiImage
      state={motiImage3}
      source={images.walkthrough_02_05}
      style={styles.image}
     />
     
    
    </View>
  );
};

export default Walkthrough4;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    width: 90,
    height: 112,
    zIndex: 0,
    borderRadius: SIZES.radius,
  },
});