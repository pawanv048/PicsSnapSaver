import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  set: function (key, val) {
    return AsyncStorage.setItem(key, JSON.stringify(val));
  },
  remove: function (key) {
    return AsyncStorage.removeItem(key);
  },
  get: async function (key) {
    try {
      const json = await AsyncStorage.getItem(key);
      return JSON.parse(json);
    } catch (error) {
      return null;
    }
  },
};
