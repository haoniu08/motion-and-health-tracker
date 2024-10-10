import { StyleSheet, Text, View, Button } from 'react-native'
import { React, useEffect } from 'react'
import ItemList from '../components/ItemList'
import { useTheme } from '../context/ThemeContext'

export default function Activities( { navigation }) {

  const { currentTheme } = useTheme();
  
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
    <View style={[styles.container, {backgroundColor: currentTheme.backgroundColor}]}>
      <ItemList type="activities"/>
    </View>
    
  )
}

const styles = StyleSheet.create({})