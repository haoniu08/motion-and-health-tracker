import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomTextInput from './CustomTextInput';

const CustomDateTimePicker = ({ selectedDate, onDateChange, style }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, date) => {
    if (event.type === 'set') {
      onDateChange(date);
    }
    setShowPicker(false);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const formattedDate = selectedDate ? selectedDate.toDateString() : '';

  return (
    <View>
      <CustomTextInput
        value={formattedDate}
        isPressable={true}
        onPress={showDatePicker}
        style={style}
      />
      {showPicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="inline"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default CustomDateTimePicker;