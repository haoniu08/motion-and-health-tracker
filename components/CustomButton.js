import { Pressable, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import styling from '../utils/StylingUtils';
import React from 'react';

const CustomButton = ({
  onPress,
  title,
  customeStyle,
  textColor,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        customeStyle,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <CustomText style={[styles.buttonText, { color: textColor }]}>{title}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: styling.colors.white,
    fontSize: styling.fontSize.largeFontSize,
  },
})

export default CustomButton