import React, { useMemo, useState } from 'react';
import {
  Image,
  View,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { dummyData } from '../../dummy';
import icons from '../constants/icons';
import { useNavigation } from '@react-navigation/native';


const MasonryCard = ({ item, style }) => {
  const navigation = useNavigation()
  const randomBool = useMemo(() => Math.random() < 0.6, []);

  // Define the onPress event handler to print the item's ID
  const handlePress = () => {
    // console.log('Item ID:', item.id);
    // console.log('img', item.imgURL)
    navigation.navigate('masdetail', { image: item.imgURL })
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

const GMasonryList = () => {

  // State to track whether new data is being loaded
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: dummyData.length,
    current_page: 1,
    last_page: Math.ceil(dummyData.length / 10), // Assuming 10 items per page
  });
  const itemsPerPage = 10; // Number of items to show per page

  // Get the current page's data
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



  return (
    <View style={{ flex: 1 }}>
      <ImageBackground blurRadius={8} source={icons.img} resizeMode="cover" style={s.image}>
        <StatusBar hidden={true} />
        <MasonryList
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<View />}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 40,
            alignSelf: 'stretch',
            paddingBottom: 10,
          }}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          numColumns={2}
          data={getCurrentPageData()}
          renderItem={renderItem}
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
  );
};

export default GMasonryList;

const s = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
