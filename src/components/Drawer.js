import DrawerContainer from './DrawerContainer';
import {createDrawerNavigator} from '@react-navigation/drawer' 
import Home from '../screens/Home/Home'
import MarketPlace from '../screens/Home/Home'
import DashBoard from '../screens/Home/Home'
import Profile from '../screens/Home/Home'

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
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
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="MarketPlace" component={MarketPlace} />
      <Drawer.Screen name="DashBoard" component={DashBoard} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
} 


