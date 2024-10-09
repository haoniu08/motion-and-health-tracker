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

const styles = StyleSheet.create({})

export default CustomButton