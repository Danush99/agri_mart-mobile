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


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Home from '../src/screens/Home/Home'
// import MarketPlace from '../src/screens/MarketPlace/MarketPlace'
// import Dashboard from '../src/screens/Dashboard/Dashboard'
// import Profile from '../src/screens/Profile/Profile'

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

// const CustomDrawer = props => {
//     const { setIsLoggedIn, profile } = useLogin();
//     return (
//       <View style={{ flex: 1 }}>
//         <DrawerContentScrollView {...props}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: 20,
//               backgroundColor: '#f6f6f6',
//               marginBottom: 20,
//             }}
//           >
//             <View>
//               <Text>{profile.fullname}</Text>
//               <Text>{profile.email}</Text>
//             </View>
//             <Image
//               source={{
//                 uri:
//                   profile.avatar ||
//                   'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
//               }}
//               style={{ width: 60, height: 60, borderRadius: 30 }}
//             />
//           </View>
//           <DrawerItemList {...props} />
//         </DrawerContentScrollView>
//         <TouchableOpacity
//           style={{
//             position: 'absolute',
//             right: 0,
//             left: 0,
//             bottom: 50,
//             backgroundColor: '#f6f6f6',
//             padding: 20,
//           }}
//           onPress={() => setIsLoggedIn(false)}
//         >
//           <Text>Log Out</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };


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
    // <Drawer.Navigator
    //   drawerPosition='left'
    //   initialRouteName='Main'
    //   drawerStyle={{
    //     width: 250
    //   }}
    //   screenOptions={{headerShown: false}}
    //   //drawerContent={props => <CustomDrawer {...props} />}
    //   drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}

    // >
    //     <Drawer.Screen name='Main' component={TabNavigation} />
    //     <Drawer.Screen name="Item" component={ItemScreen} />
    //     <Drawer.Screen name="BuyPhase" component={BuyPhase} />
    // </Drawer.Navigator>
    // <Stack.Navigator initialRouteName="WelcomePage" screenOptions={{headerTitleStyle: {fontWeight: 'bold',textAlign: 'center',alignSelf: 'center',flex: 1,},headerShown:false}} >
    <Stack.Navigator 
     screenOptions={{headerTitleStyle: {fontWeight: 'bold',textAlign: 'center',alignSelf: 'center',flex: 1,},headerShown:false}}
     > 
        <Stack.Screen name='Main' component={TabNavigation} />
        <Stack.Screen name="Item" component={ItemScreen} />
        <Stack.Screen name="BuyPhase" component={BuyPhase} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="MarketPlace" component={MarketPlace} />
        <Stack.Screen name="BiddingPlace" component={BiddingPlace} />
        <Stack.Screen name="MiniMarket" component={MiniMarket} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="ItemCRUD" component={ItemCRUD} />
    </Stack.Navigator>
  );
}