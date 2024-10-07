import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function Diet( { navigation }) {

  navigation.setOptions({
    headerRight: () => (
      <Button 
        title="Add" 
      />
    ),
  });

  return (
    <View>
      <Text>Diet</Text>
    </View>
  )
}

const styles = StyleSheet.create({})