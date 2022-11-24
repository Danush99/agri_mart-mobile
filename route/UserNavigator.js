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
import {createDrawerNavigator,  DrawerContentScrollView, DrawerItemList,} from '@react-navigation/drawer' 
import { theme } from '../src/core/theme'
import {
  StartScreen,
  LoginScreen,
  FarmerRegister1,
  FarmerRegister2,
  FarmerRegister3,
  BuyerRegister,
  ResetPasswordScreen,
  WelcomePage,
  Home,
  Profile,
  Dashboard,
  MarketPlace,
  ItemScreen,
  BuyPhase,
  BiddingPlace,
  MiniMarket,
  MyOrders,
  ItemCRUD
} from '../src/screens'
import DrawerContainer from '../src/components/DrawerContainer';
import 'localstorage-polyfill';
import Chart1 from '../src/components/Charts/Chart1_Line';
import Chart4 from '../src/components/Charts/Chart4_Pie';
import Chart5 from '../src/components/Charts/Chart5_compBar';
import TextInputCustom from '../src/components/TextInputCustom';
import { useLogin } from '../src/context/LoginProvider'
import AuthServices from "../src/services/AuthServices";



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function MainNavigator() {
    return(
    //<Stack.Navigator initialRouteName="StartScreen" screenOptions={{headerTitleStyle: {fontWeight: 'bold',textAlign: 'center',alignSelf: 'center',flex: 1,}}} >
      <Stack.Navigator screenOptions={{headerTitleStyle: {fontWeight: 'bold',textAlign: 'center',alignSelf: 'center',flex: 1,}}}>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="MarketPlace" component={MarketPlace} />
        <Stack.Screen name="Item" component={ItemScreen} />
        <Stack.Screen name="BuyPhase" component={BuyPhase} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    )
  } 

function TabNavigation(){

    return(
        <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#25B70E',
        }}
      >
          <Tab.Screen
              name="Home"
              component={Home}
              options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
              }}
          />
          <Tab.Screen
              name="MarketPlace"
              component={MarketPlace}
              options={{
              tabBarLabel: 'MarketPlace',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="barn" color={color} size={size} />
              ),
              }}
          />
          <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
              ),
              }}
          />
          <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
              }}
          />
      </Tab.Navigator>
    )
}


export default function App() {
  return (
    <Stack.Navigator 
     screenOptions={{headerTitleStyle: {fontWeight: 'bold',textAlign: 'center',alignSelf: 'center',flex: 1,},headerShown:false}}
     > 
        <Stack.Screen name='Main' component={TabNavigation} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="MarketPlace" component={MarketPlace} />

        <Stack.Screen name="Item" component={ItemScreen} />
        <Stack.Screen name="BuyPhase" component={BuyPhase} />
        <Stack.Screen name="BiddingPlace" component={BiddingPlace} />
        <Stack.Screen name="MiniMarket" component={MiniMarket} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="ItemCRUD" component={ItemCRUD} />
        {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
    </Stack.Navigator>
  );
}