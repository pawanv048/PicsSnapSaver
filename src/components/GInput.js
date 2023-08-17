import React, {useRef, useEffect} from 'react'
import { Image, Text, View, TextInput, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors, sizes } from '../constants/theme';
const GInput = (props) => {
  
  const {
    value,
    onChangeText,
    placeholder,
    source,
    secureTextEntry,
    keyboardType,
    autoFocus,
    maxLength,
    onBlur
  } = props

  const inputRef = useRef();

  const handleFocusOut = () => inputRef?.current?.blur();

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardDidHide', handleFocusOut);
    return () => {
      subscription.remove()
    };
  }, []);

  return (
    <View
      style={{
        height: 40,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#40128B',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        marginVertical: sizes.radius,
      }}>
      <Image
        source={source}
        style={{
          width: 20,
          height: 20,
          marginRight: 5,
          tintColor: '#40128B',
          resizeMode: 'contain'
        }}
      />
      <TextInput
        ref={inputRef}
        value={value}
        autoCorrect={false}
        autoCapitalize={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        spellCheck={false}
        cursorColor={colors.primary}      // for android only
        maxLength={maxLength}
        autoFocus={autoFocus}
        onBlur={onBlur}
        style={{
          height: 40,
          flex: 1,
          color:'#222'
        }}
        {...props}
        placeholderTextColor="#ccc"
        // placeholderStyle={{color: 'red'}}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default GInput

