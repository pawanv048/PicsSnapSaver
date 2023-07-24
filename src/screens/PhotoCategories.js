import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { GSearch } from '../components';
import { spacing } from '../constants/theme';
import GMasonryList from '../components/GMasonryList';
import { dummyData } from '../../dummy';
import { useNavigation } from '@react-navigation/native';

const MasonryCard = ({ item, style }) => {
  // Define the onPress event handler to print the item's ID

  const navigation = useNavigation()
  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('detail')}
      activeOpacity={0.5}
    >
      <View key={item.id} style={[{ flex: 1 }, style]}>
        <Image
          source={{ uri: item.imgURL }}
          style={{
            height: 200,
            alignSelf: 'stretch',
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

// 2,5,8,11,14,

const PhotoCategories = () => {

  const renderItem = ({ item, index }) => {
    return (
      <MasonryCard
        item={item}
        style={{
          paddingBottom: 12,
          marginLeft: index % 2 === 0 ? 0 : 12
        }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <GSearch />
      <GMasonryList
        containerStyle={{ paddingRight: 12 }}
        data={dummyData}
        renderItem={renderItem}
        numColumns={3}
      />
    </View>
  )
}

export default PhotoCategories

const styles = StyleSheet.create({})

