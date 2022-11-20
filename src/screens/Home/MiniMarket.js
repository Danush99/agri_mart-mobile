import React, { useEffect,useLayoutEffect, useRef, useState } from "react";
import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox,FlatList} from "react-native";
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

const CarouselImages = ["https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80","https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80","https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFncmljdWx0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"]



export default function MiniMarket(props) {
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
    const { navigation, route } = props;
    const _id = route.params?.TypeId;

    const [TableData, setTableData] = useState();
    const [AllItems, setAllItems] = useState();
    const [CountArray, setCountArray] = useState();

    const slider1Ref = useRef();
    const [activeSlide, setActiveSlide] = useState(0);
    const renderImage = ({ item }) => (
        <TouchableHighlight>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item }} />
          </View>
        </TouchableHighlight>
      );

      useEffect(() => {
        FarmerServices.GetFarmerProducts({_id})
        .then((res) => {
          if(res.success){
            
            const Items = res.Items
            const countList = res.countList
            var TemptableData=[]

            for(let x=0;x<Items.length;x++){
                var dataRow=[]
                const item = Items[x]
                dataRow.push(item.name)
                dataRow.push(item.category)
                dataRow.push(item.availableAmount)
                dataRow.push(countList[x])
                TemptableData.push(dataRow)
            }
            setTableData(TemptableData)
            setAllItems(Items)
            setCountArray(countList)

            console.log("Farmer products getting is success:: ");

          }else{
            console.log("backend error : ",res.message)
          }
        })
        .catch((err) => {
          console.log("backend error : ",err)
        });
      }, []);


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
    <>
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
                loop={false}
                autoplay={false}
                autoplayDelay={500}
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

        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={AllItems} renderItem={renderOption} keyExtractor={(option) => `${option._id}`} />
    </ScrollView>
    </>
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

});