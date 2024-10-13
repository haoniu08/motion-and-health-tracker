import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomTextInput from './CustomTextInput';

const CustomDateTimePicker = ({ selectedDate, onDateChange, style }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(selectedDate || null);

  const handleDateChange = (event, date) => {
    if (event.type === 'set' && date) {
      setTempDate(date);
      onDateChange(date);
    }
    setShowPicker(false);
  };

  const showDatePicker = () => {
    if (!showPicker) {
      setShowPicker(true);
    } else {
      // If the picker is already shown, set the current date on second tap
      const currentDate = new Date();
      setTempDate(currentDate);
      onDateChange(currentDate); // Update parent component
      setShowPicker(false); // Close the picker
    }
  };

  const formattedDate = tempDate ? tempDate.toDateString() : '';

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
          value={tempDate || new Date()}
          mode="date"
          display="inline"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default CustomDateTimePicker;