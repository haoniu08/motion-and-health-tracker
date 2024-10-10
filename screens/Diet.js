import { StyleSheet, Text, View, Button } from 'react-native'
import { React, useEffect } from 'react'
import ItemList from '../components/ItemList';

export default function Diet( { navigation }) {

  function handleAddPress () {
    navigation.push('AddDiet')
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
    <View>
      <ItemList type='diet'/>
    </View>
  )
}

const styles = StyleSheet.create({})