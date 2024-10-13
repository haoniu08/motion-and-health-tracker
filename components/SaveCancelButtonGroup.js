import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import styling from '../utils/StylingUtils';

const SaveCancelButtonGroup = ({ onCancelPress, onSavePress }) => {
  return (
    <View style={styles.buttonContainer}>
      <CustomButton 
        title="Cancel" 
        onPress={onCancelPress} 
        customeStyle={styles.cancelButton}
      />
      <CustomButton 
        title="Save" 
        onPress={onSavePress} 
        customeStyle={styles.saveButton}
      />  
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: styling.alignment.absolute,
    bottom: 50,
    left: 0,
    right: 0,
    justifyContent: styling.alignment.center,
    flexDirection: styling.flexDirection.row,
  },
  cancelButton: {
    marginRight: 2 * styling.margins.extraLargeMargin,
  },
});

export default SaveCancelButtonGroup;