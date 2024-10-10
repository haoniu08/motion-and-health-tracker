import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../components/CustomButton'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {

  const { toggleTheme, currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <CustomButton 
        onPress={toggleTheme}
        title="Toggle Theme"
        style={[styles.button, { backgroundColor: currentTheme.buttonColor }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({})