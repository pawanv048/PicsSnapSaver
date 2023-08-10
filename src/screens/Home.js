import React, { useState, useRef, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import GMasonryList from '../components/GMasonryList';
import icons from '../constants/icons';
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image';
import { BASE_URI } from '../services/api/API';
import { sizes } from '../constants/theme';
import GLoading from '../components/GLoading';
import { Homecard } from '../components/Shimmers/Homecard';


const Home = ({ navigation }) => {
  // State to track whether new data is being loaded
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false)


  // LOADING MORE PHOTOS
  React.useEffect(() => {
    ToastAndroid.show('Discover Beautiful Random Images', 100, ToastAndroid.SHORT)
    setLoading(true)
    fetchMore();
  }, []);

  const fetchMore = () => {
    setLoader(true)
    setTimeout(() => {
      setData(prevState => [
        ...prevState,
        ...Array.from({ length: 20 }).map((_, i) => i + 1 + prevState.length),
      ]);
      setLoader(false)
    }, 2000)
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

  // MAIN
  return (
    <React.Fragment>
      <ImageBackground
        blurRadius={8}
        source={icons.img}
        resizeMode="cover"
        style={{ flex: 1 }} >

        {/* Conditional rendering based on loading state */}
        {loader ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <GLoading size={80} />
          </View>
        ) : (
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
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.5}
          style={{
            width: 40,
            height: 40,
            elevation: 20,
            position: 'absolute',
            right: 20,
            top: sizes.radius * 4
          }}>
          <Image
            resizeMode='contain'
            source={icons.iProfile}
            style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
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