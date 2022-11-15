import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from '../screens/Home/Home'
import MarketPlace from '../screens/MarketPlace/MarketPlace'
import Dashboard from '../screens/Dashboard/Dashboard'
import Profile from '../screens/Profile/Profile'

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
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
  );
}

