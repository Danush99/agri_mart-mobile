import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  FarmerRegister1,
  FarmerRegister2,
  FarmerRegister3,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false,}}>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="FarmerRegister1" component={FarmerRegister1} />
          <Stack.Screen name="FarmerRegister2" component={FarmerRegister2} />
          <Stack.Screen name="FarmerRegister3" component={FarmerRegister3} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

