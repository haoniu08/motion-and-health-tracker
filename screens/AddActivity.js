import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import { useTheme } from '../context/ThemeContext';
import styling from '../utils/StylingUtils';
import { writeToDB, updateDB } from '../Firebase/firebaseHelper';
import DeleteIcon from '../components/DeleteIcon';
import CheckBoxForApproval from '../components/CheckBoxForApproval';
import { 
  handleCancelPress, 
  showAlert, 
  handleEditSave,  
  handleSaveAction,
  isSpecialEntry,
  handleDelete,
  handleDeletePress,
} from '../utils/HelperUtils';

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
    // a hearderRight button to delete the item, in the edit mode
    // delete from firebase, use deleteFromDB

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
});