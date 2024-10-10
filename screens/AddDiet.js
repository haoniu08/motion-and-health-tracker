import { StyleSheet, View, Alert } from 'react-native'
import { React, useState, useContext } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import CustomTextInput from '../components/CustomTextInput'
import { DataContext } from '../context/DataContext'

export default function AddDiet( {navigation} ) {

  const { addDiet } = useContext(DataContext);

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

  function showDatePicker() {
    setShowPicker(true);
  }

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Description *</CustomText>
      <CustomTextInput></CustomTextInput>
      <CustomText style={styles.title}>Calories *</CustomText>
      <CustomTextInput></CustomTextInput>
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
      
    </View>
  )
}

const styles = StyleSheet.create({})