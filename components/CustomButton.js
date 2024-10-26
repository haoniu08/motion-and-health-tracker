import { Pressable, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import styling from '../utils/StylingUtils';
import React from 'react';

const CustomButton = ({
  onPress,
  title,
  customeStyle,
  textColor,
  children,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        customeStyle,
        pressed && styles.pressed,
      ]}
      android_ripple={{ color: styling.colors.lightGray}}
      onPress={onPress}
    >
      <CustomText style={[styles.buttonText, { color: textColor }]}>{title}</CustomText>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: styling.colors.white,
    fontSize: styling.fontSize.largeFontSize,
  },
  pressed: {
    backgroundColor: styling.colors.lightGray,
    opacity: 0.5,
    borderRadius: styling.borderRadius.largeBorderRadius,
  },
  button: {
    flexDirection: styling.flexDirection.row,
  }
})

export default CustomButton