import { StyleSheet, View, Alert } from 'react-native';
import { React, useState, useContext } from 'react';
import CustomButton from '../components/CustomButton';
import CustomText from '../components/CustomText';
import CustomTextInput from '../components/CustomTextInput';
import CustomDateTimePicker from '../components/CustomDateTimePicker'; // import new component
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
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <CustomText style={styles.topTitle}>Description *</CustomText>
      <CustomTextInput
        style={styles.topInput}
        onChangeText={setDietType}
        multiline={true}
        textAlignVertical="top"
      />

      <CustomText style={styles.title}>Calories *</CustomText>
      <CustomTextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setCalories}
      />

      <CustomText style={styles.title}>Date *</CustomText>
      <CustomDateTimePicker
        style={styles.input}
        selectedDate={date}
        onDateChange={setDate}
      />

      <View style={styles.buttonContainer}>
        <CustomButton title="Cancel" onPress={() => navigation.goBack()} customeStyle={styles.cancelButton} />
        <CustomButton title="Save" onPress={handleSavePress} customeStyle={styles.saveButton} />
      </View>
    </View>
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
    height: 100,
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
    marginTop: 40,
    marginLeft: styling.margins.largeMargin,
    fontSize: styling.fontSize.largeFontSize,
  },
  title : {
    marginLeft: styling.margins.largeMargin,
    marginTop: styling.margins.largeMargin,
    fontSize: styling.fontSize.largeFontSize,
  },
  buttonContainer:{
    position: styling.alignment.absolute,
    bottom: 60,
    left: 0,
    right: 0,
    justifyContent: styling.alignment.center,
    flexDirection: styling.flexDirection.row,
  },
  cancelButton: {
    marginRight: 2 * styling.margins.extraLargeMargin,
  },
})