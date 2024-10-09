import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CustomTextInput = ( style, ...props ) => {
  return (
    <TextInput style={[styles.textInput, style]} {...props} />
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  }
});

export default CustomTextInput;