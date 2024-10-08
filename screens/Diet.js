import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function Diet( { navigation }) {

  function handleAddPress () {
    navigation.push('AddDiet')
  }

  navigation.setOptions({
    headerRight: () => (
      <Button 
        title="Add" 
        onPress={handleAddPress}
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