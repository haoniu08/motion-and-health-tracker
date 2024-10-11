import React from 'react';
import { StyleSheet, TextInput, Pressable, View } from 'react-native';

const CustomTextInput = ({ 
  isPressable = false,
  onPress,
  style, 
  ...props  
}) => {
  if (isPressable) {
    return (
      <Pressable onPress={onPress}>
        <View pointerEvents="none">
          <TextInput 
            style={[styles.textInput, style]} 
            {...props} 
          />
        </View>
      </Pressable>
    );
  }

  return (
    <TextInput 
      style={[styles.textInput, style]} 
      {...props} 
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    margin: 10,
    borderWidth: 1,
  },
});

export default CustomTextInput;