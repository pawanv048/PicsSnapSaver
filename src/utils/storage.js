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
      return json != null ? JSON.parse(json) : null;
    } catch (error) {
      return null;
    }
  },
};
