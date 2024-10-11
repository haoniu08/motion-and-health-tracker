import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useData } from '../context/DataContext'
import CustomText from './CustomText'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function ItemList({ type }) {

  const { activities, dietEntries } = useData();
  const data = type === 'activities' ? activities : dietEntries;
  const isSpecialEntry = (item) => {
    if (item.type === 'running' || item.type === 'weights') {
      return item.duration > 60;
    }
    if (item.calories) {
      return item.calories > 800;
    }
    return false;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  }

  const renderItem = ({ item }) => (
    <View>
      <CustomText style={styles.title}>{item.type}</CustomText>
      {isSpecialEntry(item) && (
          <AntDesign name="warning" size={15} color="red" style={styles.icon} />
      )}
      <CustomText>{formatDate(item.date)}</CustomText>
      <CustomText>{type === 'activities' ? `${item.duration} min` : item.calories}</CustomText>
    </View>
      
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id?.toString() || `${item.type}-${item.date}`}
    />
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 66,
    fontWeight: 'bold',
  },
})