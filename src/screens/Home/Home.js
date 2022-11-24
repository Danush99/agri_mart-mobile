import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, StyleSheet, Pressable, DrawerLayoutAndroid,TouchableOpacity,Dimensions,RefreshControl } from "react-native";
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import Button from '../../components/Button'
import { useLogin } from '../../context/LoginProvider'
import Video from 'react-native-video';
import { ItemCard } from '../../Styles/AppStyles';

const defaultProfile='https://firebasestorage.googleapis.com/v0/b/agri-mart-pid11.appspot.com/o/profilePictures%2FDefault%20profile%20picture%20green.png?alt=media&token=388b1552-9aca-451a-ab99-0e9a11985627'
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const wait = (timeout) => {return new Promise(resolve => setTimeout(resolve, timeout));}
export default function Home({ navigation }) {
  const { user,UserProfile } = useLogin();
  const [UserID, setUserID] = useState(user._id);
  const [TypeId, setTypeId] = useState(user.typeId);
  const [UserType, setUserType] = useState(user.userType);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
        <Image style={{width: 100,height: 40}} source={require("../../assets/LogoHeader.png")} />
      </View>
      ),
      headerRight: () => (
      <View>
          <Image
            source={{
              uri:(UserProfile.proPicUrl?UserProfile.proPicUrl:defaultProfile)
            }}
            style={{ width: 45, height: 45, borderRadius: 30,marginRight:15 }}
          />
      </View>
      ),
    });
  }, [refreshing]);

  const onPressOption = (item) => {
    console.log("Navigate")
    const isUpdate=false
    navigation.navigate(item.nav,{TypeId,UserType,isUpdate})
  };

  const data = [{id:1,name:"My orders",nav:"MyOrders",desc:"See your orders",img:"https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"},
  {id:2,name:"My bidding Items",nav:"BiddingPlace",desc:"See your bidding items",img:"https://media.istockphoto.com/id/521789325/photo/finger-click-bid-now-symbol.jpg?b=1&s=170667a&w=0&k=20&c=LdWAWTBjPRYuVamotO6eU4rX-gb5VMKHV6rtx6ekwM4="},
]

const data2 = [{id:1,nav:"MyOrders",name:"My orders",desc:"See your orders",img:"https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"},
{id:2,nav:"BiddingPlace",name:"My bidding place",desc:"See your bidding items",img:"https://media.istockphoto.com/id/521789325/photo/finger-click-bid-now-symbol.jpg?b=1&s=170667a&w=0&k=20&c=LdWAWTBjPRYuVamotO6eU4rX-gb5VMKHV6rtx6ekwM4="},
{id:3,nav:"MiniMarket",name:"My market items",desc:"Add your products to the marketplace",img:"https://images.unsplash.com/photo-1569180880150-df4eed93c90b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"},
]

  const renderOption = ({ item }) => (
    <TouchableHighlight activeOpacity={0.9} underlayColor="#DDDDDD" onPress={() => onPressOption(item)}>
      <View style={styles.container} >
        <Image style={styles.photo} source={{ uri: item.img }} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.desc}</Text>
      </View>
    </TouchableHighlight>
  );
  
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.HomeContainer}>
      <FlatList 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}
      vertical style={{backgroundColor: "#FFFFFF"}} showsVerticalScrollIndicator={false} numColumns={1} data={UserType=="buyer"?data:data2} renderItem={renderOption} keyExtractor={(option) => `${option.id}`} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 20,
    width: (SCREEN_WIDTH - 30),
    height: 250,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: (SCREEN_WIDTH - 30),
    height: 180,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: ItemCard.title,
  category: ItemCard.category,
  touchableHighlight:{
    justifyContent: 'center',
    alignItems: 'center',
    width: (SCREEN_WIDTH - 60) / 2,
    height: 205,
  },
  HomeContainer: {
    backgroundColor:"#FFFFFF"
  },
  video: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
});