import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import LoginScreen from '../Auth/LoginScreen';
import RegisterScreen from '../Auth/RegisterScreen'
// Enable react-native-screens
enableScreens();

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        {/* Define your screens */}
       
        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
          options={{ title: 'Register' }} 
        />
         <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
