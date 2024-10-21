import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Checkbox from 'expo-checkbox';
import styling from '../utils/StylingUtils';

export default function CheckBoxForApproval({ isApproved, setIsApproved, currentTheme }) {
  return (
    <View style={styles.checkboxContainer}>
      <CustomText style={[styles.label, { color: currentTheme.toggleColor }]}>
        Would you like to approve this special item?
      </CustomText>
      <Checkbox
        value={isApproved}
        onValueChange={setIsApproved}
        style={styles.checkbox}
        color={currentTheme.toggleColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: styling.flexDirection.row,
      position: styling.alignment.absolute,
      bottom: 85,
      left: 0,
      right: 0,
      justifyContent: styling.alignment.center,
      flexDirection: styling.flexDirection.row,
    },
    label: {
      marginRight: styling.margins.mediumMargin,
    },
  });
