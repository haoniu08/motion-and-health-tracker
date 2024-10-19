import { StyleSheet, View, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { React, useState, useContext } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import { DataContext } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import styling from '../utils/StylingUtils';

export default function AddActivity({ navigation }) {
  const { currentTheme } = useTheme();
  const { addActivity } = useContext(DataContext);

  const [activityType, setActivityType] = useState('');
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

  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);

  function handleSavePress() {
    if (validateInput()) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const newActivity = {
        type: activityType,
        duration: parseInt(duration),
        date: adjustedDate.toISOString(),
      };

      addActivity(newActivity);
      console.log('Activity added:', newActivity);

      navigation.goBack();
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
        />

        <CustomText style={[styles.title, { color: currentTheme.toggleColor }]}>Date *</CustomText>
        <CustomDateTimePicker
          style={styles.input}
          selectedDate={date}
          onDateChange={setDate}
        />

        <SaveCancelButtonGroup 
          onCancelPress={handleCancelPress}
          onSavePress={handleSavePress}
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