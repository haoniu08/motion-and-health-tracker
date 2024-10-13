import { StyleSheet, View, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { React, useState, useContext } from 'react';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomDateTimePicker from '../components/CustomDateTimePicker';
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';
import { DataContext } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';
import styling from '../utils/StylingUtils';

export default function AddDiet({ navigation }) {
  const { currentTheme } = useTheme();
  const { addDietEntry } = useContext(DataContext);

  const [dietType, setDietType] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(null);

  function handleSavePress() {
    if (validateInput()) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const newDietEntry = {
        type: dietType,
        calories: parseInt(calories),
        date: adjustedDate.toISOString(),
      };

      addDietEntry(newDietEntry);
      console.log('Diet added:', newDietEntry);
      navigation.goBack();
    }
  }

  function handleCancelPress () {
    navigation.goBack();
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

  function showAlert(message) {
    Alert.alert('Invalid Input', message, [{ text: 'OK' }], { cancelable: true });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
        <CustomText style={[styles.topTitle, { color: currentTheme.toggleColor }]}>Description *</CustomText>
        <CustomTextInput
          style={styles.topInput}
          onChangeText={setDietType}
          multiline={true}
          textAlignVertical="top"
        />

        <CustomText style={[styles.title, { color: currentTheme.toggleColor }]}>Calories *</CustomText>
        <CustomTextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setCalories}
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
})