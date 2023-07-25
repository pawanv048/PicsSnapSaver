import React, { useRef } from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
// const {width, height} = Dimensions.get('screen')
import { dummyData } from '../../dummy';
import { spacing } from '../constants/theme';

const IMAGE_SIZE = 80;

const DetailPic = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const topRef = useRef()
  const thumbRef = useRef()
  const SPACING = 10
  
  const { width, height } = Dimensions.get('window');

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <FlatList
        ref={topRef}
        data={dummyData}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.imgURL }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          )
        }}
      />
      <FlatList
        ref={thumbRef}
        data={dummyData}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: 'absolute', bottom: IMAGE_SIZE }}
        contentContainerStyle={{ paddingHorizontal: SPACING  }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{ uri: item.imgURL }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent'
                }}
              />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

export default DetailPic




