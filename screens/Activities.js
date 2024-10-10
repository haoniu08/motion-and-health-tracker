import { StyleSheet, Text, View, Button } from 'react-native'
import { React, useEffect } from 'react'

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
    <View>
      <Text>Activities</Text>
    </View>
  )
}

const styles = StyleSheet.create({})