import React, { useState, useRef, useMemo } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import GMasonryList from '../components/GMasonryList'
import icons from '../constants/icons';
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image';

const BASE_URI = 'https://source.unsplash.com/random?sig=';

const MasonryCard = ({ item, style }) => {
  const navigation = useNavigation()
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  // Define the onPress event handler to print the item's ID
  const handlePress = () => {
    // navigation.navigate('masdetail', { image: item.imgURL })
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
            borderRadius: 10
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  // State to track whether new data is being loaded
  const [data, setDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]); // Store the loaded data here
  const [pagination, setPagination] = useState({
    total: data.length,
    current_page: 1,
    last_page: Math.ceil(data.length / 20), // Assuming 10 items per page
  });
 
  // testing


  React.useEffect(() => {
        fetchMore();
      }, []);
      const fetchMore = () => {
        setDate(prevState => [
          ...prevState,
          ...Array.from({length: 20}).map((_, i) => i + 1 + prevState.length),
        ]);
      };

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
 

  function RenderFooter({ load }) {
    if (!load) return null
    return (
      <View
        style={{
          width: Dimensions.get('window').width,
          marginTop: 10,
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <React.Fragment>
      <ImageBackground
        blurRadius={8}
        source={icons.img}
        resizeMode="cover"
        style={styles.image}
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
          ListFooterComponent={<RenderFooter load={isLoading} />}
        />
      </ImageBackground>
    </React.Fragment>
  )
}

export default Home

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})
