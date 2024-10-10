import { StyleSheet, View, Alert } from 'react-native'
import { React, useState, useContext }from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import CustomTextInput from '../components/CustomTextInput'
import { DataContext } from '../context/DataContext'
import { useTheme } from '../context/ThemeContext'

export default function AddActivity({ navigation }) {

  const { currentTheme } = useTheme();

  // access the addActivity function from the DataContext
  const { addActivity } = useContext(DataContext);

  function handleSelectActivity(item) {
    setActivityType(item.value);
  } 
  
  function handleDurationChange(duration) {
    setDuration(duration);
  }
  
  function handleDateChange(event, selectedDate) {
    if (event.type === 'set') {
      setDate(selectedDate);
    }
    setShowPicker(false);
  }

  function showDatePicker() {
    setShowPicker(true);
  }

  function handleCancelPress() {
    navigation.goBack();
  } 

  function showAlert(message) {
    Alert.alert('Invalid Input', message, [{ text: 'OK' }], { cancelable: true });
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

  function handleSavePress() {
    if (validateInput()) {
      // fix time zone offset issue
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const newActivity = {
        type: activityType,
        duration: parseInt(duration),
        date: adjustedDate.toISOString(),
      }

      addActivity(newActivity);
      console.log('Activity added:', newActivity);

      navigation.goBack();
    }
  }

  const [activityType, setActivityType] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'walking' },
    { label: 'Running', value: 'running' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Weights', value: 'weights' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Cycling', value: 'cycling' },
    { label: 'Hiking', value: 'hiking' },
  ]);

  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const formattedDate = date ? date.toDateString() : '';

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.backgroundColor}]}>
      <CustomText style={styles.title}>Activity *</CustomText>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        style={styles.dropDown}
        onSelectedItem={handleSelectActivity}
        placeholder="Select an activity"
      />

      <CustomText style={styles.title}>Duration (min) *</CustomText>
      <CustomTextInput
        style={styles.input}
        placeholder="Enter duration"
        keyboardType="numeric"
        onChangeText={handleDurationChange} 
      />

      <CustomText style={styles.title}>Date *</CustomText>
      <CustomTextInput
        style={styles.input}
        value={formattedDate}
        isPressable={true}
        onPress={showDatePicker}
      />
      {showPicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="inline"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <CustomButton title="Cancel" onPress={handleCancelPress} />
        <CustomButton title="Save" onPress={handleSavePress} />  
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})