import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styling from '../utils/StylingUtils';

export default function DeleteIcon({ onPress, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <AntDesign
        name="delete"
        size={styling.fontSize.extraLargeFontSize}
        color={color}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: styling.margins.largeMargin,
  },
});