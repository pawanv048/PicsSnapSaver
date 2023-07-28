import React, {useRef, useEffect} from 'react'
import { Image, Text, View, TextInput, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { sizes } from '../constants/theme';
const GInput = (props) => {
  const {
    value,
    onChangeText,
    placeholder,
    source,
    secureTextEntry,
    keyboardType,
    autoFocus
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
          tintColor: '#40128B'
        }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        spellCheck={false}
        autoFocus={autoFocus}
        style={{
          height: 40,
          padding: Platform.OS == 'ios' ? 4 : 0,
        }}
        {...props}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default GInput

