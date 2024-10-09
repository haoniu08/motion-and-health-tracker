import { StyleSheet, View } from 'react-native'
import {React, useState }from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import CustomTextInput from '../components/CustomTextInput'

function handleSelectActivity(item) {
  setActivityType(item.value);
} 

function handleDurationChange(duration) {
  setDuration(duration);
}

export default function AddActivity() {

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

    </View>
  )
}

const styles = StyleSheet.create({})