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
  BuyerRegister,
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
import Upload from './src/screens/Profile/Upload'
import FirebaseUpload from './src/screens/Profile/uploadFirebase'



import { useLogin } from './src/context/LoginProvider';
import MainNavigator from './route/MainNavigator';
import UserNavigator from './route/UserNavigator';
import RoutController from './route/RoutController';
import LoginProvider from './src/context/LoginProvider';


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();


export default function App() {
  return (
    // <Provider theme={theme}>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="Upload" screenOptions={{ headerShown: false,}}>
    //       {/* <Stack.Screen name="StartScreen" component={StartScreen} />
    //       <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //       <Stack.Screen name="FarmerRegister1" component={FarmerRegister1} />
    //       <Stack.Screen name="FarmerRegister2" component={FarmerRegister2} />
    //       <Stack.Screen name="FarmerRegister3" component={FarmerRegister3} />
    //       <Stack.Screen name="BuyerRegister" component={BuyerRegister} />
    //       <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
    //       <Stack.Screen name="WelcomePage" component={WelcomePage} />
    //       <Stack.Screen name="Profile" component={Profile} />
    //       <Stack.Screen name="Dashboard" component={Dashboard} />
    //       <Stack.Screen name="MarketPlace" component={MarketPlace} />
    //       <Stack.Screen name="Item" component={ItemScreen} />
    //       <Stack.Screen name="BuyPhase" component={BuyPhase} />
    //       <Stack.Screen name="Home" component={Home} />
    //       <Stack.Screen name="Chart1" component={Chart1} />
    //       <Stack.Screen name="Chart4" component={Chart4} />
    //       <Stack.Screen name="Chart5" component={Chart5} />
    //       <Stack.Screen name="Chart5" component={Chart5} /> */}
    //       {/* <Stack.Screen name="Upload" component={Upload} /> */}
    //       <Stack.Screen name="FirebaseUpload" component={FirebaseUpload} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </Provider>
    <LoginProvider>
      <NavigationContainer>
        <RoutController/>
      </NavigationContainer>
  </LoginProvider>
  );
}

//#25B70E