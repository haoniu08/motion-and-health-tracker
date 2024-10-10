import { StyleSheet, Text, View, Button } from 'react-native'
import { React, useEffect } from 'react'
import ItemList from '../components/ItemList'

export default function Activities( { navigation }) {

  function handleAddPress() {
    navigation.navigate('AddActivity')
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          title="Add" 
          onPress={handleAddPress}
        />
      ),
    });
  }, [navigation]);

  return (
    <ItemList type="activities"/>
  )
}

const styles = StyleSheet.create({})