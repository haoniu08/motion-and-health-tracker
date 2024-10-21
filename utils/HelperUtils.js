import { Alert } from 'react-native';
import { deleteFromDB } from '../Firebase/firebaseHelper';

export function handleCancelPress(navigation) {
    navigation.goBack();
}
  
export function showAlert( message ) {
    Alert.alert('Invalid Input', message, [{ text: 'OK' }], { cancelable: true });
}

export function handleEditSave( handleSavePress ) {
    Alert.alert('Important', 'Are you sure you want to save these changes?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: handleSavePress }
    ]);
}

export function handleSaveAction(isEdit, handleEditSave, handleSavePress) {
    if (isEdit) {
      handleEditSave( handleSavePress );
    } else {
      handleSavePress();
    }
}

export const isSpecialEntry = (item) => {
    if (item.type === 'Running' || item.type === 'Weights') {
      return item.duration > 60;
    }
    if (item.calories) {
      return item.calories > 800;
    }
    return false;
};

export function handleDelete(item) {
    if (item.duration) {
      deleteFromDB(item.id, 'activities');
    } else if (item.calories) {
      deleteFromDB(item.id, 'diet');
    }
}
  
  export function handleDeletePress(item, handleDelete, navigation) {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => {
          handleDelete(item);
          navigation.goBack();
        }
      },
    ]);
  }

