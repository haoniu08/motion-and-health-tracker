import { StyleSheet, View, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import { useTheme } from '../context/ThemeContext';
import styling from '../utils/StylingUtils';
import { writeToDB, updateDB } from '../Firebase/firebaseHelper';
import Checkbox from 'expo-checkbox';

export default function AddActivity({ navigation, item, isEdit }) {
  const { currentTheme } = useTheme();
  const [activityType, setActivityType] = useState(item?.type || '');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

  const [duration, setDuration] = useState(item?.duration || '');
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showSpecialCheckbox, setShowSpecialCheckbox] = useState(false);

  useEffect(() => {
    if (isEdit && item) {
      setActivityType(item.type);
      setDuration(item.duration.toString());
      setDate(new Date(item.date));
      setIsSpecial(item.isSpecial || false);
      setIsApproved(item.isApproved || false);
      setShowSpecialCheckbox(item.isSpecial && !item.isApproved);
    }
  }, [isEdit, item]);

  const isSpecialEntry = (item) => {
    if (item.type === 'Running' || item.type === 'Weights') {
      return item.duration > 60;
    }
    if (item.calories) {
      return item.calories > 800;
    }
    return false;
  };

  function handleSavePress() {
    if (validateInput()) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      
      // Update the isSpecial value based on the logic
      const isSpecialValue = isSpecialEntry({ type: activityType, duration });
  
      const newActivity = {
        type: activityType,
        duration: parseInt(duration),
        date: adjustedDate.toISOString(),
        isSpecial: isSpecialValue,
        isApproved: isApproved,
      };
  
      if (isEdit) {
        updateDB(item.id, newActivity, 'activities');
      } else {
        writeToDB(newActivity, 'activities');
      }
  
      navigation.goBack();
    }
  }

  function handleEditSave() {
    Alert.alert('Important', 'Are you sure you want to save these changes?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: handleSavePress }
    ]);
  }

  function handleSaveAction() {
    if (isEdit) {
      handleEditSave();
    } else {
      handleSavePress();
    }
  }

  function handleCancelPress() {
    navigation.goBack();
  }

  function validateInput() {
    if (!activityType) {
      showAlert('Please select an activity');
      return false;
    }
    if (!duration || isNaN(duration) || duration <= 0 || !/^\d+$/.test(duration)) {
      showAlert('Please enter a valid duration (positive number)');
      return false;
    }
    if (!date) {
      showAlert('Please select a date');
      return false;
    }
    return true;
  }

  function showAlert(message) {
    Alert.alert('Invalid Input', message, [{ text: 'OK' }], { cancelable: true });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
        <CustomText style={[styles.topTitle, { color: currentTheme.toggleColor }]}>Activity *</CustomText>
        <DropDownPicker
          open={open}
          value={activityType}
          items={items}
          setOpen={setOpen}
          setValue={setActivityType}
          setItems={setItems}
          style={styles.dropDown}
          dropDownContainerStyle={styles.dropDownContainer}
          placeholder=""
        />

        <CustomText style={[styles.title, { color: currentTheme.toggleColor }]}>Duration (min) *</CustomText>
        <CustomTextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setDuration}
          value={duration.toString()}
        />

        <CustomText style={[styles.title, { color: currentTheme.toggleColor }]}>Date *</CustomText>
        <CustomDateTimePicker
          style={styles.input}
          selectedDate={date}
          onDateChange={setDate}
        />
        
        {isEdit && showSpecialCheckbox && (
          <View style={styles.checkboxContainer}>
            <CustomText style={[styles.label, { color: currentTheme.toggleColor }]}>Mark as approved</CustomText>
            <Checkbox
              value={isApproved}
              onValueChange={setIsApproved}
              style={styles.checkbox}
            />
          </View>
        )}
        <SaveCancelButtonGroup 
          onCancelPress={handleCancelPress}
          onSavePress={handleSaveAction}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropDown: {
    alignSelf: styling.alignment.center,
    width: '90%',
    margin: styling.margins.mediumMargin,
  },
  dropDownContainer: {
    alignSelf: styling.alignment.center,
    width: '90%',
    backgroundColor: styling.colors.white,
  },
  input: {
    padding: styling.paddings.mediumPadding,
    borderRadius: styling.borderRadius.smallBorderRadius,
    backgroundColor: styling.colors.white,
    alignSelf: styling.alignment.center,
    width: '90%',
    margin: styling.margins.mediumMargin,
  },
  topTitle: {
    marginTop: styling.margins.largeMargin,
    marginLeft: styling.margins.largeMargin,
    fontSize: styling.fontSize.mediumFontSize,
  },
  title : {
    marginLeft: styling.margins.largeMargin,
    marginTop: styling.margins.mediumMargin,
    fontSize: styling.fontSize.mediumFontSize,
  },
  checkboxContainer: {
    flexDirection: styling.flexDirection.row,
    position: styling.alignment.absolute,
    bottom: 80,
    left: 0,
    right: 0,
    justifyContent: styling.alignment.center,
    flexDirection: styling.flexDirection.row,
  }
});