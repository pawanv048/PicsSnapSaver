import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import GMasonryList from '../GMasonryList'

const Shimmer = createShimmerPlaceholder(LinearGradient);


const HomeCards = () => {
  return (
    <React.Fragment>

    </React.Fragment>
  )
}


const Homecard = () => {
  return (




    <GMasonryList
      data={[1, 1, 1, 1]}
      renderItem={({ item }) => {
        return (
          
            <Shimmer
              shimmerColors={['#151515', '#2D2D2D', '#161616']}
              style={{
                height: 280,
                width: '90%',
                marginBottom: 10,
                borderRadius: 10,
              }} />
         
        )
      }}

    />

  )
}

export default Homecard

const styles = StyleSheet.create({})