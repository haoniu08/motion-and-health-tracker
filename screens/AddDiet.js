import { StyleSheet, View, Alert } from 'react-native'
import { React, useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import CustomTextInput from '../components/CustomTextInput'
import { DataContext } from '../context/DataContext'
import { useTheme } from '../context/ThemeContext'
import styling from '../utils/StylingUtils'

export default function AddDiet({ navigation }) {

  const { currentTheme } = useTheme();

  const { addDietEntry } = useContext(DataContext);

  const [dietType, setDietType] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(null);
  const formattedDate = date ? date.toDateString() : '';
  const [showPicker, setShowPicker] = useState(false);

  function handleDateChange (event, selectedDate) {
    if (event.type === 'set') {
      setDate(selectedDate);
    }
    setShowPicker(false);
  }

  function handleDietEntry (dietType) {
    setDietType(dietType);
  } 
  
  function handleCaloriesChange (calories) {
    setCalories(calories);
  }

  function showDatePicker() {
    if (showPicker) {
      setDate(new Date());
      setShowPicker(false);
    } else {
      setShowPicker(true);
    }
  }

  function handleCancelPress () {
    navigation.goBack(); 
  }

  function validateInput () {
    if (!dietType) {
      showAlert('Please fill in the description');
      return false
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
  
  function handleSavePress () {
    if (validateInput()) {
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const newDietEntry = {
        type: dietType,
        calories: parseInt(calories),
        date: adjustedDate.toString(),
      }
      addDietEntry(newDietEntry);
      console.log('Diet added:', newDietEntry);

      navigation.goBack();
    }
  }

  function showAlert (message) {
    Alert.alert('Invalid Input', message, [{ text: 'OK' }], { cancelable: true });
  }

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.backgroundColor}]}>
      <CustomText style={styles.topTitle}>Description *</CustomText>
      <CustomTextInput
        style={styles.topInput}
        onChangeText={handleDietEntry}
        multiline={true}
      />
      <CustomText style={styles.title}>Calories *</CustomText>
      <CustomTextInput
        style={styles.input}
        placeholder="Enter duration"
        keyboardType="numeric"
        onChangeText={handleCaloriesChange}
      />
      <CustomText style={styles.title}>Date *</CustomText>
      <CustomTextInput
        style={styles.input}
        value={formattedDate}
        isPressable={true}
        onPress={showDatePicker}
      />
      {
        showPicker && (
          <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="inline"
          onChange={handleDateChange}
        />
        )
      }

<View style={styles.buttonContainer}>
        <CustomButton 
          title="Cancel" 
          onPress={handleCancelPress} 
          customeStyle={styles.cancelButton}
        />
        <CustomButton 
          title="Save" 
          onPress={handleSavePress} 
          customeStyle={styles.saveButton}
        />  
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topInput: {
    borderRadius: styling.borderRadius.smallBorderRadius,
    backgroundColor: styling.colors.white,
    alignSelf: styling.alignment.center,
    width: '90%',
    height: 130,
    margin: styling.margins.mediumMargin,
  },
  input: {
    borderRadius: styling.borderRadius.smallBorderRadius,
    backgroundColor: styling.colors.white,
    alignSelf: styling.alignment.center,
    width: '90%',
    margin: styling.margins.mediumMargin,
  },
  topTitle: {
    marginTop: 70,
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
    bottom: 70,
    left: 0,
    right: 0,
    justifyContent: styling.alignment.center,
    flexDirection: styling.flexDirection.row,
  },
  cancelButton: {
    marginRight: 2 * styling.margins.extraLargeMargin,
  },
})