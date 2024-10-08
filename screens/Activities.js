import { StyleSheet, Text, View, Button } from 'react-native'
import { React, useState } from 'react'

export default function Activities( { navigation }) {

  function handleAddPress() {
    navigation.navigate('AddActivity')
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
      <Text>Activities</Text>
    </View>
  )
}

const styles = StyleSheet.create({})