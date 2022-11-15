import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BottomTab from '../components/BottomTabs'
import {createDrawerNavigator} from '@react-navigation/drawer' 
import DrawerContainer from '../components/DrawerContainer';

const Drawer = createDrawerNavigator();

export default function Dashboard({ navigation }) {
  return (
    <BottomTab/>
  );
}
