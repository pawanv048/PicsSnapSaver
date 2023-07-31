import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { GSearch } from '../components';
import GMasonryList from '../components/GMasonryList';
import { useNavigation } from '@react-navigation/native';
import { apiCall, baseUrl } from '../services/api/API';
import FastImage from 'react-native-fast-image';
import { colors, sizes } from '../constants/theme';

const MasonryCard = ({ item, style }) => {
  // Define the onPress event handler to print the item's ID


  const navigateToDetailScreen = () => {
    // const encodedTitle = encodeURIComponent(item.title);
    navigation.navigate('detail', { title: item.slug });
  };

  const navigation = useNavigation()
  return (
    <TouchableOpacity
      key={item.id}
      onPress={navigateToDetailScreen}
      activeOpacity={0.5}
    >
      <View key={item.id} style={[{ flex: 1 }, style]}>
        <FastImage
          source={{
            uri: item?.cover_photo?.urls.small,
            priority: FastImage.priority.low
          }}
          style={{
            height: 200,
            alignSelf: 'stretch',
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            bottom: 40,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            numberOfLines={1}
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: 12,
              fontWeight: '600',
              color: colors.white,
            }}
            >
            {item?.title} 
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

// 2,5,8,11,14,

// Main
const PhotoCategories = () => {

  const [topics, setTopics] = useState([]);
  // console.log('title=>', topics.map((item) => item.title))

  useEffect(() => {
    const url = `${baseUrl}/topics?&page=1&order_by=latest&per_page=21`;
    const onSuccess = (data) => {
      setTopics(data);
    };
    const onError = (error) => {
      console.error(error);
    };

    apiCall({
      url: url,
      method: 'GET',
      onSuccess: onSuccess,
      onError: onError,
    });
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <MasonryCard
        item={item}
        style={{
          marginLeft: index % 2 === 0 ? 0 : 12
        }}
      />
    );
  };
  return (
    <View style={{ flex: 1, paddingTop: sizes.radius * 3 }}>
      {/* <GSearch /> */}
      <GMasonryList
        containerStyle={{ paddingRight: 12 }}
        data={topics}
        renderItem={renderItem}
        // onEndReached={fetchMore}
        numColumns={3}
      />
    </View>
  )
}

export default PhotoCategories

const styles = StyleSheet.create({})

