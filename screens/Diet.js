import { StyleSheet, View, Button } from 'react-native'
import { React, useEffect } from 'react'
import ItemList from '../components/ItemList'
import { useTheme } from '../context/ThemeContext'
import styling from '../utils/StylingUtils';
import { Ionicons } from '@expo/vector-icons';

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
        <View style={styles.iconContainer}>
          <Ionicons 
            name="add" 
            size={styling.fontSize.extraLargeFontSize} 
            color={styling.colors.white}
            onPress={handleAddPress} 
            style={styles.icon}
          />
          <Ionicons 
            name="fast-food" 
            size={styling.fontSize.extraLargeFontSize}
            color={styling.colors.white} 
            onPress={handleAddPress} 
            style={styles.icon}
          />
        </View>
      ),
    });
  }, [navigation, currentTheme]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <ItemList type="diet"  navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: styling.flexDirection.row,
    marginRight: styling.margins.largeMargin,
  },
});