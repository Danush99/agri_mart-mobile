import { StatusBar } from 'expo-status-bar'
import React, { useState,useContext } from "react"
import { createStackNavigator } from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer' 


import { useLogin } from '../src/context/LoginProvider'
import MainNavigator from '../route/MainNavigator'
import UserNavigator from '../route/UserNavigator'
import LoginProvider from '../src/context/LoginProvider'


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

const RoutController = () => {
    const { isLoggedIn } = useLogin();
    //return (isLoggedIn ?  <UserNavigator />:<MainNavigator /> );
    return (isLoggedIn ?  <UserNavigator /> :<MainNavigator />);
  };
  export default RoutController;
