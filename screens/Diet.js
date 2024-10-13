import { StyleSheet, View, Button } from 'react-native'
import { React, useEffect } from 'react'
import ItemList from '../components/ItemList'
import { useTheme } from '../context/ThemeContext'

export default function Diet({ navigation }) {

  const { currentTheme } = useTheme();

  function handleAddPress() {
    navigation.push('AddDiet');
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
          color={currentTheme.color} // Ensure button uses the current theme
        />
      ),
    });
  }, [navigation, currentTheme]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <ItemList type="diet" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});