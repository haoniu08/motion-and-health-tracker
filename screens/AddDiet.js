import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import CheckBoxForApproval from '../components/CheckBoxForApproval';
import { useTheme } from '../context/ThemeContext';
import styling from '../utils/StylingUtils';
import { writeToDB, updateDB } from '../Firebase/firebaseHelper';
import DeleteIcon from '../components/DeleteIcon';
import {
  handleCancelPress,
  showAlert,
  handleEditSave,
  handleSaveAction,
  isSpecialEntry,
  handleDelete,
  handleDeletePress
} from '../utils/HelperUtils';

export default function AddDiet({ navigation, item, isEdit }) {
  const { currentTheme } = useTheme();
  const [dietType, setDietType] = useState(item?.type || '');
  const [calories, setCalories] = useState(item?.calories || '');
  const [date, setDate] = useState(item ? new Date(item.date) : null);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showSpecialCheckbox, setShowSpecialCheckbox] = useState(false);

  useEffect(() => {
    if (isEdit && item) {
      setDietType(item.type);
      setCalories(item.calories.toString());
      setDate(new Date(item.date));
      setIsSpecial(item.isSpecial || false);
      setIsApproved(item.isApproved || false);
      setShowSpecialCheckbox(item.isSpecial && !item.isApproved);
    }

    navigation.setOptions({
      headerRight: () => (
        <DeleteIcon
          onPress={() => handleDeletePress(item, handleDelete, navigation)}
          color={currentTheme.color}
        />
      ),
    });
  }, [isEdit, item]);

  function handleSavePress() {
    if (validateInput()) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      
      // Update the isSpecial value based on the logic
      const isSpecialValue = isSpecialEntry({ calories });

      const newDiet = {
        type: dietType,
        calories: parseInt(calories),
        date: adjustedDate.toISOString(),
        isSpecial: isSpecialValue,
        isApproved: isApproved,
      };

      if (isEdit) {
        updateDB(item.id, newDiet, 'diet');
      } else {
        writeToDB(newDiet, 'diet');
      }

      navigation.goBack();
    }
  }

  function validateInput() {
    if (!dietType) {
      showAlert('Please fill in the description');
      return false;
    }
    if (!calories || isNaN(calories) || calories <= 0 || !/^\d+$/.test(calories)) {
      showAlert('Please enter a valid calories amount (positive number)');
      return false;
    }
    if (!date) {
      showAlert('Please select a date');
      return false;
    }
    return true;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
        <CustomText style={[styles.topTitle, { color: currentTheme.toggleColor }]}>Description *</CustomText>
        <CustomTextInput
          style={styles.topInput}
          onChangeText={setDietType}
          value={dietType}
          multiline={true}
          textAlignVertical="top"
        />

        <CustomText style={[styles.title, { color: currentTheme.toggleColor }]}>Calories *</CustomText>
        <CustomTextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setCalories}
          value={calories.toString()}
        />

        <CustomText style={[styles.title, { color: currentTheme.toggleColor }]}>Date *</CustomText>
        <CustomDateTimePicker
          style={styles.input}
          selectedDate={date}
          onDateChange={setDate}
        />

        {isEdit && showSpecialCheckbox && (
          <CheckBoxForApproval
            isApproved={isApproved}
            setIsApproved={setIsApproved}
            currentTheme={currentTheme}
          />
        )}

        <SaveCancelButtonGroup 
          onCancelPress={() => handleCancelPress(navigation)}
          onSavePress={() => handleSaveAction(isEdit, handleEditSave, handleSavePress)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topInput: {
    padding: styling.paddings.mediumPadding,
    borderRadius: styling.borderRadius.smallBorderRadius,
    backgroundColor: styling.colors.white,
    alignSelf: styling.alignment.center,
    width: '90%',
    height: 90,
    margin: styling.margins.mediumMargin,
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
});