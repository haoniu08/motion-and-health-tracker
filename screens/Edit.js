import React from 'react'
import AddActivity from './AddActivity'
import AddDiet from './AddDiet'
import SaveCancelButtonGroup from '../components/SaveCancelButtonGroup';

export default function Edit({ route, navigation }) {
  const { item, type } = route.params;
  
  return (
    <>
      {type === 'activities' ? (
        <AddActivity item={item} type={type} navigation={navigation} isEdit />
      ) : (
        <AddDiet item={item} type={type} navigation={navigation} isEdit /> 
      )}
    </>
  )
}

// const styles = StyleSheet.create({})