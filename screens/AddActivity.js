import { StyleSheet, View } from 'react-native'
import {React, useState }from 'react'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import CustomTextInput from '../components/CustomTextInput'

export default function AddActivity() {

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

  function handleCancel() {
    navigation.goBack();
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

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Activity*</CustomText>
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

      <CustomText style={styles.title}>Duration (min)*</CustomText>
      <CustomTextInput
        style={styles.input}
        placeholder="Enter duration"
        keyboardType="numeric"
        onChangeText={handleDurationChange} 
      />

      <CustomText style={styles.title}>Date*</CustomText>
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
        <CustomButton title="Cancel" onPress={handleCancel} />
        <CustomButton title="Save" onPress={() => {}} />  
      </View>

    </View>
  )
}

const styles = StyleSheet.create({})