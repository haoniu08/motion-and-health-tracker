import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup';
import CustomText from './CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styling from '../utils/StylingUtils';

export default function ItemList({ type, navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const collectionName = type === 'activities' ? 'activities' : 'diet';
    const unsubscribe = onSnapshot(collection(database, collectionName), (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setData(items);
    });

    return () => unsubscribe();
  }, [type]);

  // const isSpecialEntry = (item) => {
  //   if (item.type === 'Running' || item.type === 'Weights') {
  //     return item.duration > 60;
  //   }
  //   if (item.calories) {
  //     return item.calories > 800;
  //   }
  //   return false;
  // };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toDateString();
  };

  const handlePress = (item) => {
    // make sure to pass the item and type to the Edit screen
    navigation.navigate('Edit', { item, type });
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handlePress(item)}>
      <View style={styles.entryContainer}>
        <CustomText style={styles.title}>{item.type}</CustomText>
        {/* Show warning icon only if entry is special and not approved */}
        {item.isSpecial && !item.isApproved ? (
          <AntDesign name="warning" size={20} color="yellow" style={styles.icon} />
        ) : null}
        <View style={styles.rightContainer}>
          <CustomText style={styles.date}>{formatDate(item.date)}</CustomText>
          <CustomText style={styles.amount}>
            {type === 'activities' ? `${item.duration} min` : `${item.calories}`}
          </CustomText>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id?.toString() || `${item.type}-${item.date}`}
    />
  );
}

const styles = StyleSheet.create({
  entryContainer: {
    flexDirection: styling.flexDirection.row,
    alignItems: styling.alignment.center,
    borderRadius: styling.borderRadius.smallBorderRadius,
    margin: styling.margins.extraLargeMargin,
    padding: styling.paddings.largePadding,
    backgroundColor: styling.colors.indigo,
    width: '90%',
    alignSelf: styling.alignment.center,
  },
  title: {
    flex: 1,
    fontSize: styling.fontSize.largeFontSize,
    fontWeight: styling.font.bold,
  },
  rightContainer: {
    flexDirection: styling.flexDirection.row,
    alignItems: styling.alignment.center,
    justifyContent: styling.flexAlign.end,
  },
  date: {
    marginLeft: styling.margins.mediumMargin,
    marginRight: styling.margins.smallMargin,
    padding: styling.paddings.smallPadding,
    color: styling.colors.indigo,
    backgroundColor: styling.colors.white,
    fontWeight: styling.font.bold,
    fontSize: styling.fontSize.mediumFontSize,
  },
  amount: {
    padding: styling.paddings.smallPadding,
    color: styling.colors.indigo,
    backgroundColor: styling.colors.white,
    fontWeight: styling.font.bold,
    fontSize: styling.fontSize.mediumFontSize,
  },
});