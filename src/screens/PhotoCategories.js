import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { GSearch } from '../components';
import GMasonryList from '../components/GMasonryList';
import { apiCall, generateCategoriesUrl } from '../services/api/API';
import { colors, sizes } from '../constants/theme';
import LinearGradient from 'react-native-linear-gradient';


const PhotoCategories = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const url = generateCategoriesUrl();
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

  const renderItem = ({ item }) => {
    return <MasonryCard item={item} style={{ marginLeft: 12,  }} />
  };

  // MAIN RENDER 
  return (
    <View style={{ flex: 1, paddingTop: sizes.radius * 3, backgroundColor: 'white' }}>
      <GMasonryList
        containerStyle={{ paddingRight: 12 }}
        data={topics}
        renderItem={renderItem}
        numColumns={3}
      />
    </View>
  )
}

export default PhotoCategories;


// LISTING CATEGORIES
const MasonryCard = ({ item, style }) => {
  // Define the onPress event handler to print the item's ID

  const navigateToDetailScreen = () => {
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
            bottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
            colors={['#221087', '#4F10B2', '#7B10D4']}
            style={{ width: '100%' }}
          >
            <Text
              numberOfLines={1}
              style={{
                width: '100%',
                textAlign: 'center',
                fontSize: 13,
                fontWeight: '600',
                color: colors.white,
                fontFamily: 'Caveat-Bold'
              }}
            >
              {item?.title}
            </Text>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );
};
