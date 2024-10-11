import { TouchableOpacity, StyleSheet } from 'react-native'
import CustomText from './CustomText'
import styling from '../utils/StylingUtils'
import React from 'react'

const CustomButton = ({
  onPress,
  title,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <CustomText style={styles.buttonText}>{title}</CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: styling.colors.white,
    fontSize: 16,
  },
})

export default CustomButton