import React, {useState, useRef, useMemo, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import GMasonryList from '../components/GMasonryList';
import icons from '../constants/icons';
import {colors} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import {BASE_URI} from '../services/api/API';
import {sizes} from '../constants/theme';
import GLoading from '../components/GLoading';
import {Homecard} from '../components/Shimmers/Homecard';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeContext} from '../helper/ThemeContext';

const Home = ({navigation}) => {
  // State to track whether new data is being loaded
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);

  // const theme = {mode: 'dark'};
  const {theme} = useContext(ThemeContext);
  console.log(theme);
  const activeColor = colors[theme.mode];

  const isInitialMount = useRef(true);

  // LOADING MORE PHOTOS
  React.useEffect(() => {
    if (isInitialMount.current) {
      ToastAndroid.show(
        'Discover Beautiful Random Images',
        100,
        ToastAndroid.SHORT,
      );
      isInitialMount.current = false;
    }
    setLoading(true);
    fetchMore();
  }, []);

  const fetchMore = () => {
    setData(prevState => [
      ...prevState,
      ...Array.from({length: 20}).map((_, i) => i + 1 + prevState.length),
    ]);
    setLoader(false);
  };

  // LISTING ITEMS
  const renderItem = ({item, i}) => {
    return (
      <MasonryCard
        item={item}
        style={{
          marginLeft: i % 2 === 0 ? (i === 0 ? 0 : 1) : 12,
        }}
      />
    );
  };

  // MAIN VIEW
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.mode === 'light' ? '#FFF3DA' : activeColor.primary,
      }}>
      {/* Conditional rendering based on loading state */}
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
          top: sizes.radius * 4,
          backgroundColor: colors.light,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          elevation: 20,
        }}>
        <Image
          resizeMode="contain"
          source={icons.iSettings}
          style={{width: 25, height: 25, tintColor: '#221087'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const MasonryCard = ({item, style}) => {
  const navigation = useNavigation();
  const randomBool = useMemo(() => Math.random() < 0.5, []);

  const handlePress = () => {
    navigation.navigate('categories');
  };

  return (
    <TouchableOpacity key={item.id} onPress={handlePress} activeOpacity={0.5}>
      <View
        key={item.id}
        style={[{marginTop: 12, flex: 1, elevation: 10}, style]}>
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
