import { StyleSheet, View } from 'react-native'
import { React, useEffect } from 'react'
import ItemList from '../components/ItemList'
import { useTheme } from '../context/ThemeContext'
import { Ionicons } from '@expo/vector-icons';
import styling from '../utils/StylingUtils';
// import { database } from '../Firebase/firebaseSetup';

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
        <View style={styles.iconContainer}>
          <Ionicons 
            name="add" 
            size={styling.fontSize.extraLargeFontSize} 
            color={styling.colors.white}
            onPress={handleAddPress} 
            style={styles.icon}
          />
          <Ionicons 
            name="walk" 
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
      <ItemList type="activities" navigation={navigation}/>
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