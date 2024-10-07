import { StyleSheet, Text, View, Button } from 'react-native'
import { React, useState } from 'react'

export default function Activities( { navigation }) {

  navigation.setOptions({
    headerRight: () => (
      <Button 
        title="Add" 
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