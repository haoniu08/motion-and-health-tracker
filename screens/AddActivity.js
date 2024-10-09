import { StyleSheet, View } from 'react-native'
import {React, useState }from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'
import CustomTextInput from '../components/CustomTextInput'


export default function AddActivity() {

  const [activity, setActivity] = useState('');
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

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Activity*</CustomText>
      <DropDownPicker
        open={open}
        items={items}
        setOpen={setOpen}
        style={styles.dropDown}
        placeholder="Select an activity"
      />
    </View>
  )
}

const styles = StyleSheet.create({})