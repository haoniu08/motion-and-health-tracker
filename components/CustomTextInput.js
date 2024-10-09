import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const CustomTextInput = ( style, ...props ) => {
  return (
    <TextInput style={[styles.textInput, style]} {...props} />
  )
}

const styles = StyleSheet.create({});

export default CustomTextInput;