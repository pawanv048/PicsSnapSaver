import React, { useState, useRef, useMemo } from 'react'
import { StyleSheet, Text, View, ImageBackground,TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import GMasonryList from '../components/GMasonryList'
import icons from '../constants/icons'
import { dummyData } from '../../dummy'
import { useNavigation } from '@react-navigation/native'


const MasonryCard = ({ item, style }) => {
  const navigation = useNavigation()
  const randomBool = useMemo(() => Math.random() < 0.6, []);

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
        <Image
          source={{ uri: item.imgURL }}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: 'stretch',
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};


const Home = () => {
  // State to track whether new data is being loaded
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]); // Store the loaded data here
  const [pagination, setPagination] = useState({
    total: dummyData.length,
    current_page: 1,
    last_page: Math.ceil(dummyData.length / 10), // Assuming 10 items per page
  });
  const itemsPerPage = 10; // NUMBER OF ITEMS SHOWS PER PAGE
  const previousScrollOffset = useRef(0);
  // Use useRef to store accumulated data

  // GET USER'S CURRENT PAGE DATA
  const getCurrentPageData = () => {
    const startIndex = (pagination.current_page - 1) * itemsPerPage;
    console.log('Starting index=>', startIndex);
    const endIndex = startIndex + itemsPerPage;
    console.log('ending index=>', endIndex)
    return dummyData.slice(startIndex, endIndex);
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

  const handleLoadMore = () => {
    if (!isLoading && pagination.current_page < pagination.last_page) {
      setIsLoading(true);
      // Simulating server-side delay for demonstration purposes
      setTimeout(() => {
        setPagination((prevPagination) => ({
          ...prevPagination,
          current_page: prevPagination.current_page + 1,
        }));
        setIsLoading(false);
      }, 1000); // 1 second delay
    }
  }

  const handleScroll = (event) => {
    const currentScrollOffset = event.nativeEvent.contentOffset.y;
    if (currentScrollOffset > previousScrollOffset.current && pagination.current_page > 1) {
      const itemsToAdd = getCurrentPageData();
      setLoadedData((prevData) => [...itemsToAdd, ...prevData]);
      setPagination((prevPagination) => ({
        ...prevPagination,
        current_page: prevPagination.current_page - 1,
      }));
    }
    previousScrollOffset.current = currentScrollOffset;
  };

  return (
    <View style={{ flex: 1 }}>
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
          }}
          data={getCurrentPageData()}
          onEndReached={handleLoadMore}
          onScroll={handleScroll}
          renderItem={renderItem}
          numColumns={2}
        />
        {/* Conditional rendering of ActivityIndicator */}
        {isLoading && (
          <View
            style={{
              width: Dimensions.get('window').width,
              paddingVertical: 10,
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </ImageBackground>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})