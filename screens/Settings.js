import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
  const { toggleTheme, currentTheme } = useTheme();

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