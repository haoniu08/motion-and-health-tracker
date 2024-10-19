import { TouchableOpacity, StyleSheet } from 'react-native'
import CustomText from './CustomText'
import styling from '../utils/StylingUtils'
import React from 'react'

const CustomButton = ({
  onPress,
  title,
  customeStyle,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, customeStyle]}
      onPress={onPress}
    >
      <CustomText style={[styles.buttonText, { color: textColor }]}>{title}</CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: styling.colors.white,
    fontSize: styling.fontSize.largeFontSize,
  },
})

export default CustomButton