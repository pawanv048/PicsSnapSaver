import { View, Text, Image, Animated } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { SIZES } from "../constants/theme";
import Constants from "../constants/Constants";


const ITEM_WIDTH = 120;

const Walkthrough1 = () => {
  const [row1Images, setRow1Images] = useState([
    ...Constants.walkthrough_01_01_images,
    ...Constants.walkthrough_01_01_images,
  ]);
  // console.log('data=>', row1Images)

  const [currentPosition, setCurrentPosition] = useState(0);
  // console.log(currentPosition);

  const [row2Images, setRow2Images] = useState([
    ...Constants.walkthrough_01_02_images,
    ...Constants.walkthrough_01_02_images,
  ]);
  // console.log('data2=>', row2Images)
  const [row2CurrentPosition, setRow2CurrentPosition] = useState(0);

  const row1Flatlistref = React.useRef();
  const row2refFlatlist = React.useRef();

  useEffect(() => {
    let positionTimer;
    
    const timer = () => {
      positionTimer = setTimeout(() => {
        //increment scrollposition with interval

        //slider1
        setCurrentPosition(prevPosition => {
          const position = Number(prevPosition) + 1
          row1Flatlistref.current.scrollToOffset({
            offset: position, animated: true
          })

          const maxOffset = Constants.walkthrough_01_01_images.length * ITEM_WIDTH

          if(prevPosition > maxOffset){
            const offset = prevPosition - maxOffset

            row1Flatlistref.current.scrollToOffset({
              offset, animated: true
            })

            return offset
          } else {
            return position
          }

        })


        //slider2
        setRow2CurrentPosition(prevPosition => {
          const position = Number(prevPosition) + 1
          row2refFlatlist.current.scrollToOffset({
            offset: position, animated: true
          })

          const maxOffset = Constants.walkthrough_01_02_images.length * ITEM_WIDTH

          if(prevPosition > maxOffset){
            const offset = prevPosition - maxOffset

            row2refFlatlist.current.scrollToOffset({
              offset, animated: true
            })

            return offset
          } else {
            return position
          }

        })

        timer()
      }, 32);
    };

    timer();
    return () => {
      clearTimeout(positionTimer);
    };
  }, []);
  
  

  return (
    <View>
      {/* Slide 1 */}
      <FlatList
        ref={row1Flatlistref}
        decelerationRate="fast"
        horizontal
        data={row1Images}
        showsHorizontalScrollIndicator={false}
        listKey="Slide1"
        scrollEnabled={false}
        keyExtractor={(_, index) => `Slide1_${index}`}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item}
                style={{
                  width: 110,
                  height: 110,
                }}
              />
            </View>
          );
        }}
      />

      {/* Slide 2 */}

      <FlatList
        ref={row2refFlatlist}
        decelerationRate="fast"
        style={{
          marginTop: SIZES.padding,
          transform: [{rotate: "180deg"}]
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        listKey="Slide2"
        scrollEnabled={false}
        keyExtractor={(_, index) => `Slide2_${index}`}
        data={row2Images}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                alignItems: "center",
                justifyContent: "center",
                transform: [{rotate: "180deg"}]
              }}
            >
              <Image
                source={item}
                style={{
                  width: 110,
                  height: 110,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Walkthrough1;
