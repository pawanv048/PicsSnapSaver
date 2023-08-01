import React, { useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import GMasonryList from '../components/GMasonryList';
import icons from '../constants/icons';
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image';
import Homecard from '../components/Shimmers/Homecard';
import GLoading from '../components/GLoading';
import { BASE_URI } from '../services/api/API';



const Home = () => {
  // State to track whether new data is being loaded
  const [data, setDate] = useState([]);

  
  // LOADING MORE PHOTOS
  React.useEffect(() => {
    fetchMore();
  }, []);

  const fetchMore = () => {
    setDate(prevState => [
      ...prevState,
      ...Array.from({ length: 20 }).map((_, i) => i + 1 + prevState.length),
    ]);
  };

  // LISTING ITEMS
  const renderItem = ({ item, i }) => {
    return (
      <MasonryCard
        item={item}
        style={{
          marginLeft: i % 2 === 0 ? (i === 0 ? 0 : 1) : 12,
        }}
      />
    );
  };


  function emptyList({ load }) {
    if (!load) return null
    return (
      <View style={{ alignSelf: 'center', flex: 1 }}>
        <GLoading />
      </View>
    )
  }

// MAIN
  return (
    <React.Fragment>
      <ImageBackground
        blurRadius={8}
        source={icons.img}
        resizeMode="cover"
        style={{
          flex: 1
        }}
      >

        <GMasonryList
          containerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 40,
            alignSelf: 'stretch',
            paddingBottom: 10,
            flexGrow: 1,
          }}
          data={data}
          onEndReached={fetchMore}
          renderItem={renderItem}
          numColumns={2}
        />
      </ImageBackground>
    </React.Fragment>
  )
}

export default Home;


const MasonryCard = ({ item, style }) => {
  const navigation = useNavigation()
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  // Define the onPress event handler to print the item's ID
  const handlePress = () => {
    navigation.navigate('categories')
  };

  return (
    <TouchableOpacity
      key={item.id}
      onPress={handlePress}
      activeOpacity={0.5}
    >
      <View key={item.id} style={[{ marginTop: 12, flex: 1 }, style]}>
        <FastImage
          source={{
            uri: BASE_URI + item,
            priority: FastImage.priority.normal,
          }}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: 'stretch',
            borderRadius: 10,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </TouchableOpacity>
  );
};