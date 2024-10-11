import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import { useTheme } from '../context/ThemeContext'

export default function Settings({ navigation }) {
  const { toggleTheme, currentTheme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: currentTheme.headerColor }, // Update header color based on theme
      headerTintColor: currentTheme.color,
    });
  }, [navigation, currentTheme]);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <CustomButton 
        onPress={toggleTheme}
        title="Toggle Theme"
        style={{ backgroundColor: currentTheme.buttonColor }}
      />
      <CustomText style={{ color: currentTheme.color }}>
      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});