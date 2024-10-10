import { StyleSheet, View, Alert } from 'react-native'
import { React, useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import CustomTextInput from '../components/CustomTextInput'
import { DataContext } from '../context/DataContext'

export default function AddDiet({ navigation }) {

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

  function showDatePicker () {
    setShowPicker(true);
  }

  function handleCancelPress () {
    navigation.goBack();
  }

  function validateInput () {
    return true
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
    <View style={styles.container}>
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

const styles = StyleSheet.create({})