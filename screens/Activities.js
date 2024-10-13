import { StyleSheet, View, Button } from 'react-native'
import { React, useEffect } from 'react'
import ItemList from '../components/ItemList'
import { useTheme } from '../context/ThemeContext'

export default function Activities({ navigation }) {

  const { currentTheme } = useTheme();

  function handleAddPress() {
    navigation.navigate('AddActivity')
  }

  // Ensure header options are updated to reflect the theme
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: currentTheme.headerColor }, // Update header color based on theme
      headerTintColor: currentTheme.color,
      headerRight: () => (
        <Button 
          title="Add" 
          onPress={handleAddPress}
        />
      ),
    });
  }, [navigation, currentTheme]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <ItemList type="activities" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});