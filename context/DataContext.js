import { StyleSheet } from 'react-native'
import React, {createContext, useState, useContext} from 'react'

export const DataContext = createContext();

export const useData = () => useContext(DataContext);

export default function DataProvider({ children }) {

    const [activities, setActivities] = useState([]);
    const [dietEntries, setDietEntries] = useState([]);

    const addActivity = (activity) => {
        setActivities([...activities, activity]);
    }

    const addDietEntry = (dietEntry) => {
        setDietEntries([...dietEntries, dietEntry]);
    }

  return (
    <DataContext.Provider value={{ 
        activities, 
        addActivity, 
        dietEntries, 
        addDietEntry }}
    >
      {children}
    </DataContext.Provider>
  )
}

const styles = StyleSheet.create({})