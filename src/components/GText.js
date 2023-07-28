import React from 'react'
import { Text } from 'react-native'

const GText = (props) => {

  const { text, style, componentProps} = props;
  return (
      <Text
        {...componentProps}
        style={[
          {
            fontSize: fontSize(props),
            color: color(props),
            textAlign: 'left'
          },
          style
        ]}
      >{text}</Text>
  )
};

const fontSize = (props) => {
  if(props.g1){
    return 17
  } else if(props.g2){
    return 15
  } else if(props.g3){
    return 13
  } else if(props.g4){
    return 11
  }
  return 15
}

const fontFamily = () => {

}

const italic = () => {

}

const color = (props) => {
  if (props.light){
    return '#999'
  }
  return '#222'
}

export default GText

