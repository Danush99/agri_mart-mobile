import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, StyleSheet, Pressable, DrawerLayoutAndroid,TouchableOpacity,Dimensions,RefreshControl } from "react-native";
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage";
//import Drawer from "../../components/Drawer";
//import DrawerContainer from '../../components/DrawerContainer';
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName, getRecipesByIngredientName } from "../../data/MockDataAPI";
import { ItemCard } from '../../Styles/AppStyles';
import { TextInput } from "react-native-gesture-handler";
import MarketPlaceServices from "../../services/MarketPlaceServices";
import { useLogin } from '../../context/LoginProvider'

const defaultProfile='https://firebasestorage.googleapis.com/v0/b/agri-mart-pid11.appspot.com/o/profilePictures%2FDefault%20profile%20picture%20green.png?alt=media&token=388b1552-9aca-451a-ab99-0e9a11985627'
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const wait = (timeout) => {return new Promise(resolve => setTimeout(resolve, timeout));}
export default function HomeScreen(props) {
  const { user,UserProfile } = useLogin();
  const [UserID, setUserID] = useState(user._id);
  const [TypeId, setTypeId] = useState(user.typeId);
  const [UserType, setUserType] = useState(user.userType);

  const drawer = useRef(null);
  const { navigation } = props;
  const [value, setValue] = useState("");
  const [filterV, setFilterV] = useState("");
  const [data, setData] = useState();
  const [Allitems, setAllitems] = useState();
  const [VegItems, setVegItems] = useState();
  const [FruitItems, setFruitItems] = useState();
  const [DirectBItems, setDirectBItems] = useState();
  const [BidItems, setBidItems] = useState();
  const [CurrentData, setCurrentData] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect( ()=> {
    console.log("Welcome to Market Place")
    MarketPlaceServices.GetMarketItems()
    .then((data)=>{
        //setOfficerDetails(officer[0]);
        setAllitems(data.Allitems)
        setVegItems(data.VegiItems)
        setFruitItems(data.FruitItems)
        setDirectBItems(data.DirectBItems)
        setBidItems(data.BidItems)
        setData(data.Allitems)
        //console.log(data.Allitems)
    })
    .catch((err)=>{
        console.log("error : ",err);
    })
  },[refreshing]);


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

  const handleSearch = (text) => {
    if (text == "") {
      setData(Allitems);
      setValue(text);
    } else {
      const nameUpper = text.toUpperCase();
      const searchArray = [];
      data.map(item => {
        if (item.name.toUpperCase().includes(nameUpper)) {
          searchArray.push(item);
        }
      });
      setData(searchArray);
      setValue(text);
    }
  };

  const handleFilter = (buttonName) => {
    if (buttonName == "All") {
      setFilterV("All")
      setData(Allitems);
    } else if(buttonName == "Direct_Buying") {
      setFilterV("Direct_Buying")
      setData(DirectBItems);
    } else if(buttonName == "Bidding") {
      setFilterV("Bidding")
      setData(BidItems);
    }else if(buttonName == "Vegetables") {
      setFilterV("Vegetables")
      setData(VegItems);
    }else if(buttonName == "Fruits") {
      setFilterV("Fruits")
      setData(FruitItems);
    }
  };

  const onPressRecipe = (item) => {
    navigation.navigate("Item", { item,TypeId,UserType,UserProfile });
  };

  // const renderRecipes = ({ item }) => (
  //   <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
  //     <View style={styles.container}>
  //       <Image style={styles.photo} source={{ uri: item.photo_url }} />
  //       <Text style={styles.title}>{item.title}</Text>
  //       <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
  //     </View>
  //   </TouchableHighlight>
  // );

  const renderRecipes = ({ item }) => (
    <TouchableHighlight activeOpacity={0.9} underlayColor="#DDDDDD" onPress={() => onPressRecipe(item)}>
      <View style={styles.container} >
        <Image style={styles.photo} source={{ uri: item.img[0] }} />
        <Text style={styles.title}>{item.name}</Text>
        {/* <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text> */}
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.MainContainer}>

        <View style={styles.searchContainer}>
          <Image style={styles.searchIcon} source={require("../../assets/search.png")} />
          <TextInput
            style={styles.searchInput}
            onChangeText={(text)=>handleSearch(text)}
            value={value}
            placeholder="search Items here"
          />
          <Pressable onPress={() => handleSearch("")}>
          <Image style={styles.searchIcon} source={require("../../assets/close.png")} />
          </Pressable>
        </View>

        <View style={styles.FilterButtonsContainer}>
          <Pressable onPress={() => handleFilter("All")}>
            <Text style={[ styles.FilterButtons,filterV === "All" && styles.FilterButtonsSelected, ]}>All</Text>
          </Pressable>
          <Pressable onPress={() => handleFilter("Direct_Buying")}>
            <Text style={[ styles.FilterButtons,filterV === "Direct_Buying" && styles.FilterButtonsSelected, ]}>Direct Buying</Text>
          </Pressable>
          <Pressable onPress={() => handleFilter("Bidding")}>
            <Text style={[ styles.FilterButtons,filterV === "Bidding" && styles.FilterButtonsSelected, ]}>Bidding</Text>
          </Pressable>
          <Pressable onPress={() => handleFilter("Vegetables")}>
            <Text style={[ styles.FilterButtons,filterV === "Vegetables" && styles.FilterButtonsSelected, ]}>Vegetables</Text>
          </Pressable>
          <Pressable onPress={() => handleFilter("Fruits")}>
            <Text style={[ styles.FilterButtons,filterV === "Fruits" && styles.FilterButtonsSelected, ]}>Fruits</Text>
          </Pressable>
        </View>
        
      <FlatList 
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
      vertical showsVerticalScrollIndicator={false} numColumns={2} data={data} renderItem={renderRecipes} keyExtractor={(item) => `${item._id}`} />
      {/* <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} /> */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: ItemCard.container,
  touchableHighlight:{
    justifyContent: 'center',
    alignItems: 'center',
    width: (SCREEN_WIDTH - 60) / 2,
    height: 205,
  },
  photo: ItemCard.photo,
  title: ItemCard.title,
  category: ItemCard.category,
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: { 
    marginTop:10,
    marginBottom:5,
    marginLeft:17,
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#dfe8e2", 
    borderRadius: 10, 
    width: "90%",
    justifyContent: "space-around",
  },
  searchIcon: { 
    width: 20, 
    height: 20, 
    tintColor: 'black' 
  },
  searchInput: {
    backgroundColor: "#dfe8e2",
    color: "black",
    width: 180,
    height: 50,
  },
  HeaderLogo:{
    width: 63, 
    height: 25, 
    marginRight:10
  },
  FilterButtons:{
    marginLeft: 15,
  },
  FilterButtonsSelected:{
    color: "#25B70E",
    textDecorationLine: 'underline',
    marginLeft: 15
  },
  FilterButtonsContainer:{
    marginLeft:6,
    marginTop:10,
    flexDirection: 'row',
    flexWrap: 'wrap',  
  },
  MainContainer:{
    backgroundColor: 'white',
    flex: 1
},
});
