import React, {useState} from 'react';
import {View, Animated, FlatList, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LinearGradientView, TextButton } from '../components';
import Constants from '../constants/Constants';
import {COLORS, SIZES, FONTS, sizes, colors} from '../constants/theme';
import {Walkthrough1, Walkthrough2, Walkthrough3, Walkthrough4} from './index';



const Walkthrough = ({navigation}) => {
  const [walkthrough2Animate, setwalkthrough2Animate] = useState(false);
  const [walkthrough3Animate, setwalkthrough3Animate] = useState(false);
  const [walkthrough4Animate, setwalkthrough4Animate] = useState(false);

  const onViewChangeRef = React.useRef(({viewableItems, changed}) => {
    if (viewableItems[0].index == 1) {
      setwalkthrough2Animate(true);
    }

    if (viewableItems[0].index == 2) {
      setwalkthrough3Animate(true);
    }

    if (viewableItems[0].index == 3) {
      setwalkthrough4Animate(true);
    }
  });

  const scrollX = React.useRef(new Animated.Value(0)).current;
  console.log(scrollX)

  function Dots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {Constants.walkthrough.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.dark08, colors.light, COLORS.dark08],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot${index}`}
              style={{
                borderRadius: 4,
                marginHorizontal: 4,
                width: 8,
                height: 8,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  }

  function renderFooter() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: SIZES.height * 0.37,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.height > 700 ? SIZES.padding : 40,
        }}>
        <Dots />
      </View>
    );
  }

  return (
    <LinearGradientView
      style={{
        flex: 1,
        backgroundColor: COLORS.light,
      }}>
      <Animated.FlatList
        data={Constants.walkthrough}
        keyExtractor={item => item.id}
        decelerationRate='fast'
        horizontal
        bounces={false}
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewChangeRef.current}
        pagingEnabled={true}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: SIZES.width,
                justifyContent: 'center',
              }}>
              {/* walkthrough images */}
              <View style={{flex: 1, justifyContent: 'center'}}>
                {index == 0 && <Walkthrough1 />}
                {index == 1 && <Walkthrough2 animate={walkthrough2Animate} />}
                {index == 2 && <Walkthrough3 animate={walkthrough3Animate} />}
                {index == 3 && <Walkthrough4 animate={walkthrough4Animate} />}
              </View>

              {/* title&description */}

              <View
                style={{
                  height: SIZES.height * 0.39,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: SIZES.padding,
                  // backgroundColor: 'red'
                }}>
                {/* <LinearGradient colors={['red', 'blue']}> */}
                <Text
                  style={{
                    ...FONTS.h2,
                    color: colors.light
                    // marginTop: SIZES.radius * 0.5,
                  }}>
                  {item.title}
                </Text>
                {/* </LinearGradient> */}
                <Text
                  style={{
                    marginTop: SIZES.radius * 0.5,
                    textAlign: 'center',
                    ...FONTS.body3,
                    color: COLORS.light60,
                  }}>
                  {item.sub_title}
                </Text>

                <TextButton
                    contentContainerStyle={{
                        // height: 40,
                        borderRadius: SIZES.radius,
                        marginTop: sizes.radius,
                        width: sizes.width / 1.5,
                        padding: 10,
                        position: 'absolute',
                        bottom: 25
                    }}
                    label="Visit Home"
                    onPress={() => navigation.navigate('home')}
                />
              </View>
            </View>
          );
        }}
      />
      {renderFooter()}
    </LinearGradientView>
  );
};

export default Walkthrough;
