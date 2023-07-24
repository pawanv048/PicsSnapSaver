import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import icons from '../constants/icons';
import {colors, spacing, sizes, shadow} from '../constants/theme';

const GSearch = (props) => {
  const [search, setSearch] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
          <Image
            source={icons.search}
            style={{
              width: 20,
              height: 20,
              tintColor: 'grey'
            }}
          />
        </View>
        <TextInput
          style={styles.field}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          autoCapitalize={false}
        />
      </View>
    </View>
  );
}

export default GSearch;


const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.m,
    paddingTop: spacing.l,
    paddingBottom: spacing.l / 1.5,
  },
  inner: {
    flexDirection: 'row',
  },
  search: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  field: {
    backgroundColor: colors.white,
    paddingLeft: spacing.xl + spacing.s,
    paddingRight: spacing.m,
    paddingVertical: spacing.m,
    borderRadius: sizes.radius,
    height: 54,
    flex: 1,
    ...shadow.light,
  },
  filter: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
})


