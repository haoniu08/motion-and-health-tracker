import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styling from './utils/StylingUtils';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import Settings  from './screens/Settings';
import AddActivity from './screens/AddActivity';
import AddDiet from './screens/AddDiet';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabs () {
  return (
    <BottomTab.Navigator
      screenOptions = {({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Activities') {
            iconName = focused ? "walk" : "walk-outline";
          } else if (route.name === 'Diet') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name="Activities" component={Activities} />
      <BottomTab.Screen name="Diet" component={Diet} />
      <BottomTab.Screen name="Settings" component={Settings} />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{headerShown: false}}/>
        <Stack.Screen 
          name="AddActivity" 
          component={AddActivity} 
          options={{
            title: "Add an Activity",
            headerBackTitle: "Activities",
          }}
          
          />
        <Stack.Screen 
          name="AddDiet" 
          component={AddDiet} 
          options={{
            title: "Add A Diet Entry",
            headerBackTitle: "Diet",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
