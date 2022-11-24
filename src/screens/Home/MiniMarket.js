import React, { useEffect,useLayoutEffect, useRef, useState } from "react";
import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox,FlatList,RefreshControl} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Table, Row, Rows } from 'react-native-table-component';
import BackButton from '../../components/BackButton'
import AuthServices from "../../services/AuthServices";
import FarmerServices from "../../services/FarmerServices";
import BuyerServices from "../../services/BuyerServices";
import MarketButton from "../../components/MarketButton";
import { ItemCard } from '../../Styles/AppStyles';


const { width: viewportWidth } = Dimensions.get("window");
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const state= {
    tableHead: ['Name', 'Category', 'Availability', 'Orders'],
    tableData: []}

const CarouselImages = ["https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFya2V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1555876484-a71a693b161b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFya2V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"]
const wait = (timeout) => {return new Promise(resolve => setTimeout(resolve, timeout));}


export default function MiniMarket(props) {
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
    const { navigation, route } = props;
    const _id = route.params?.TypeId;

    const [TableData, setTableData] = useState();
    const [AllItems, setAllItems] = useState();
    const [FlatArray, setFlatArray] = useState();
    const [CountArray, setCountArray] = useState();
    const [BiddingArray, setBiddingArray] = useState();
    const [DirectArray, setDirectArray] = useState();
    const [filterV, setFilterV] = useState("");


    const slider1Ref = useRef();
    const [activeSlide, setActiveSlide] = useState(0);
    const renderImage = ({ item }) => (
        <TouchableHighlight>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item }} />
          </View>
        </TouchableHighlight>
      );

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() => setRefreshing(false));
    }, []);
      
      useEffect(() => {
        FarmerServices.GetFarmerProducts({_id})
        .then((res) => {
          if(res.success){
            
            const Items = res.Items
            const countList = res.countList
            var TemptableData=[]
            var bidArray=[]
            var dirArray=[]

            for(let x=0;x<Items.length;x++){
                var dataRow=[]
                const item = Items[x]
                dataRow.push(item.name)
                dataRow.push(item.category)
                dataRow.push(item.availableAmount)
                dataRow.push(countList[x])
                TemptableData.push(dataRow)
                if(item.bid=="1"){
                  bidArray.push(item)
                }else{
                  dirArray.push(item)
                }
            }
            setBiddingArray(bidArray)
            setDirectArray(dirArray)
            setTableData(TemptableData)
            setAllItems(Items)
            setFlatArray(Items)
            setCountArray(countList)

            console.log("Farmer products getting is success:: ");

          }else{
            console.log("backend error : ",res.message)
          }
        })
        .catch((err) => {
          console.log("backend error : ",err)
        });
      }, [refreshing]);


      const onPressOption = (item) => {
        console.log("Navigate")
        const IsUpdate = true
       navigation.navigate("ItemCRUD",{item,_id,IsUpdate})
      };

      const screenItem = (item) => {
        console.log("Navigate")
        const IsUpdate = true
        navigation.navigate("Item", { item });
      };

      const addItem = () => {
        console.log("Navigate")
        const IsUpdate = false
       navigation.navigate("ItemCRUD",{_id,IsUpdate})
      };
    
      const handleFilter = (buttonName) => {
        if (buttonName == "All") {
          setFilterV("All")
          setFlatArray(AllItems);
        } else if(buttonName == "Direct_Buying") {
          setFilterV("Direct_Buying")
          setFlatArray(DirectArray);
        } else if(buttonName == "Bidding") {
          setFilterV("Bidding")
          setFlatArray(BiddingArray);
        }
      };

    const renderOption = ({ item }) => (
        <TouchableHighlight activeOpacity={0.9} underlayColor="#DDDDDD" onPress={() => onPressOption(item)} onLongPress={() => screenItem(item)}> 
          <View style={styles.renderItemContainer} >
            <Image style={styles.photo} source={{ uri: item.img[0] }} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </TouchableHighlight>
      );

    return (
  <View style={{backgroundColor:"#FFFFFF"}}>
    <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={FlatArray} renderItem={renderOption} keyExtractor={(option) => `${option._id}`} 
    
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />}

    ListHeaderComponent={
    <ScrollView style={styles.MainContainer}>
        
      <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
          <Carousel
              ref={slider1Ref}
              data={CarouselImages}
              renderItem={renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={true}
              autoplay={true}
              autoplayDelay={2000}
              autoplayInterval={3000}
              onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
              dotsLength={CarouselImages.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={slider1Ref.current}
              tappableDots={!!slider1Ref.current}
          />
          </View>
      </View>

      <View style={styles.infoItemContainer}>
          <BackButton goBack={navigation.goBack} />
          <Text style={styles.infoItemName}>My Market</Text>
      </View>
      <MarketButton
          buttonName="Click here to add Items"
          onPress={addItem}
          />
      <View style={styles.container}>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={{ margin: 2,textAlign:"center" }}/>
          <Rows data={TableData} textStyle={{ margin: 6 }}/>
          </Table>
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
      </View>
      
    </ScrollView>
    }
    
    />
  
  </View>
    )
  }

const styles = StyleSheet.create({
container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
head: { height: 40, backgroundColor: '#f1f8ff' },
text: { margin: 6 },
MainContainer:{
    backgroundColor: 'white',
    flex: 1
},
carouselContainer: {
    minHeight: 250
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  infoItemContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoItemName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  renderItemContainer: ItemCard.container,
  touchableHighlight:{
    justifyContent: 'center',
    alignItems: 'center',
    width: (SCREEN_WIDTH - 60) / 2,
    height: 205,
  },
  photo: ItemCard.photo,
  title: ItemCard.title,
  category: ItemCard.category,
  FilterButtons:{
    marginLeft: SCREEN_WIDTH/7,
  },
  FilterButtonsSelected:{
    color: "#25B70E",
    textDecorationLine: 'underline',
    marginLeft: SCREEN_WIDTH/7
  },
  FilterButtonsContainer:{
    marginLeft:6,
    marginTop:10,
    flexDirection: 'row',
    flexWrap: 'wrap',  
  },

});