import { StyleSheet, View, Alert } from 'react-native'
import { React, useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import CustomTextInput from '../components/CustomTextInput'
import { DataContext } from '../context/DataContext'
import { useTheme } from '../context/ThemeContext'

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
      <CustomText style={styles.title}>Description *</CustomText>
      <CustomTextInput
        onChangeText={handleDietEntry}
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
        <CustomButton title="Cancel" onPress={handleCancelPress} />
        <CustomButton title="Save" onPress={handleSavePress} />  
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})