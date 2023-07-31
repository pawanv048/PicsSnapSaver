import React, { useRef, useEffect, useState } from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
  PermissionsAndroid,
  Platform
} from 'react-native';
import FastImage from 'react-native-fast-image';
// const {width, height} = Dimensions.get('screen')
import RNFetchBlob from 'rn-fetch-blob';
import { dummyData } from '../../dummy';
import icons from '../constants/icons';
import { spacing } from '../constants/theme';
import { apiCall, baseUrl } from '../services/api/API';


const IMAGE_SIZE = 80;


// MAIN
const DetailPic = ({route}) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [topics, setTopics] = useState([]);
  // console.log("topics =>", topics)
  const topRef = useRef()
  const thumbRef = useRef()
  const SPACING = 10

  const { width, height } = Dimensions.get('window');
  const { title } = route?.params || {}

  useEffect(() => {
    const url = `${baseUrl}/topics/${title}/photos?page=1&per_page=10&order_by=latest`;
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


  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  const checkPermission = async () => {

    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };


  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    let image_URL = topics[activeIndex]?.urls?.full;
    // let image_URL = dummyData[index].imgURL;

    console.log('imageurl=>', image_URL)
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ?
      /[^.]+$/.exec(filename) : undefined;
  };




  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar hidden />
      <FlatList
        ref={topRef}
        data={topics}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
        }}
        renderItem={({ item }) => {
            
          return (
            <View style={{ width, height }}>
              <FastImage
                source={{ uri: item.urls?.full }}
                style={[StyleSheet.absoluteFillObject]}
              />
              <TouchableOpacity
                onPress={checkPermission}
                activeOpacity={0.5}
              >
                <Image
                  source={icons.idownload}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: 40,
                    height: 40,
                    position: 'absolute',
                    top: 25,
                    right: 25
                  }}
                />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <FlatList
        ref={thumbRef}
        data={topics}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: 'absolute', bottom: IMAGE_SIZE }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <FastImage
                source={{uri: item.urls?.small }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent'
                }}
              />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

export default DetailPic




