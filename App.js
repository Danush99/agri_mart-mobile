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
import {createDrawerNavigator} from '@react-navigation/drawer' 
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  FarmerRegister1,
  FarmerRegister2,
  FarmerRegister3,
  ResetPasswordScreen,
  WelcomePage,
  Home,
  Profile,
  Dashboard,
  MarketPlace,
  ItemScreen,
  BuyPhase,
} from './src/screens'
import DrawerContainer from './src/components/DrawerContainer';
import 'localstorage-polyfill';
import Chart1 from './src/components/Charts/Chart1_Line';
import Chart4 from './src/components/Charts/Chart4_Pie';
import Chart5 from './src/components/Charts/Chart5_compBar';
import TextInputCustom from './src/components/TextInputCustom';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function MainNavigator(){
  <Stack.Navigator initialRouteName="StartScreen" screenOptions={{headerTitleStyle: {fontWeight: 'bold',textAlign: 'center',alignSelf: 'center',flex: 1,}}} >
  {/* <Stack.Navigator initialRouteName="WelcomePage" screenOptions={{ headerShown: false,}}> */}
    <Stack.Screen name="WelcomePage" component={WelcomePage} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="MarketPlace" component={MarketPlace} />
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
}

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      screenOptions={{headerShown: false}}
      drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} 


export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="WelcomePage" screenOptions={{ headerShown: false,}}>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="FarmerRegister1" component={FarmerRegister1} />
          <Stack.Screen name="FarmerRegister2" component={FarmerRegister2} />
          <Stack.Screen name="FarmerRegister3" component={FarmerRegister3} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="MarketPlace" component={MarketPlace} />
          <Stack.Screen name="Item" component={ItemScreen} />
          <Stack.Screen name="BuyPhase" component={BuyPhase} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chart1" component={Chart1} />
          <Stack.Screen name="Chart4" component={Chart4} />
          <Stack.Screen name="Chart5" component={Chart5} />
          <Stack.Screen name="TextInputCustom" component={TextInputCustom} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

