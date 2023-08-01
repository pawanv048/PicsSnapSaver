import React, { useMemo, useState, useRef, useEffect } from 'react';
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

const GMasonryList = (props) => {
  const {
    refreshing,
    data,
    innerRef,
    ListHeaderComponent,
    ListEmptyComponent,
    ListFooterComponent,
    ListHeaderComponentStyle,
    containerStyle,
    contentContainerStyle,
    renderItem,
    onEndReachedThreshold,
    onEndReached,
    onRefresh,
    loading,
    LoadingView,
    numColumns,
    onScroll,
    removeClippedSubviews = false,
    keyExtractor,
    keyboardShouldPersistTaps = 'handled',
    refreshControl = true,
    refreshControlProps,
    style
  } = props;


  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent backgroundColor="transparent"
      />  
        <MasonryList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={style}
          ListHeaderComponent={<View />}
          contentContainerStyle={{
            ...containerStyle
          }}
          onRefresh={onRefresh}
          onEndReachedThreshold={onEndReachedThreshold}
          onEndReached={onEndReached}
          onScroll={onScroll}
          numColumns={numColumns}
          data={data}
          loading={loading}
          LoadingView={LoadingView}
          renderItem={renderItem}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
    </View>
  );
};

export default GMasonryList;