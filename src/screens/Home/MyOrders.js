import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox,FlatList} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Table, Row, Rows } from 'react-native-table-component';
import BackButton from '../../components/BackButton'
import MarketServices from "../../services/MarketPlaceServices";
import { ItemCard } from '../../Styles/AppStyles';



const { width: viewportWidth } = Dimensions.get("window");
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const CarouselImages = ["https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80","https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80","https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFncmljdWx0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"]

export default function MyOrders(props) {
  const { navigation, route } = props;
  //const _id = route.params?.TypeId;
  const _id = "6374e2e7ae58e454baa9cc4c";
  const UserType = route.params?.UserType;
  const slider1Ref = useRef();
  const [activeSlide, setActiveSlide] = useState(0);
  const [AllOrders, setAllOrders] = useState();


  const renderOption = ({ item }) => (
    <TouchableHighlight activeOpacity={0.9} underlayColor="#DDDDDD" >
      <View style={styles.container} >
        {/* <Image style={styles.photo} source={{ uri: item.img }} /> */}
        {/* <Text style={styles.category}>{order.itemObject.name}</Text> */}
        <Text style={styles.title}>{item.itemObject.name}</Text>

        <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Buyer name         </Text>
          <Text style={styles.inputDetails}>{item.BName}</Text>
        </View>

        <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Farmer name         </Text>
          <Text style={styles.inputDetails}>{item.BName}</Text>
        </View>

        <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Mobile Number        </Text>
          <Text style={styles.inputDetails}>{item.phone_number}</Text>
        </View>

        <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Option       </Text>
          <Text style={styles.inputDetails}>{item.isDelivery?"Delivery":"PickUp"}</Text>
        </View>

        <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Delivery Address       </Text>
          <Text style={styles.inputDetails}>{item.deliveryAddress}</Text>
        </View>

        <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Amount       </Text>
          <Text style={styles.inputDetails}>{item.amount}</Text>
        </View>

        <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Total Bill       </Text>
          <Text style={styles.inputDetails}>{item.totalBill}</Text>
        </View>
        
      </View>
    </TouchableHighlight>
  );

  const renderImage = ({ item }) => (
      <TouchableHighlight>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item }} />
        </View>
      </TouchableHighlight>
  );

    useEffect(() => {
      console.log(_id,UserType)
      MarketServices.GetMarketOrders(_id,UserType)
      .then((res) => {
        if(res.success){
          console.log("All orders: ",res.orders[0].amount)
          setAllOrders(res.orders)
          console.log("Orders getting is success:: ");

        }else{
          console.log("backend error : ",res.message)
        }
      })
      .catch((err) => {
        console.log("backend error : ",err)
      });
    }, []);

  return (

    <View style={styles.MainContainer}>

        {/* <View style={styles.carouselContainer}>
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
        </View> */}

        <View style={styles.infoItemContainer}>
          <BackButton goBack={navigation.goBack} />
          <Text style={styles.infoItemName}>My Orders</Text>
        </View>
        
        {AllOrders?null:
          <Text style={styles.infoItemName}>You have no order Items </Text>
        }
        

      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={AllOrders} renderItem={renderOption} keyExtractor={(orderI) => `${orderI._id}`} />

      </View>
    )
  }

const styles = StyleSheet.create({
  mainInfoContainer:{
    marginLeft:0,
    marginTop:8,
    flexDirection: 'row',
    flexWrap: 'wrap',  
  },
  detail:{
    fontWeight: 'bold',
    marginTop:1,
    marginLeft:40,
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'flex-start',
  },
  inputDetails:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft:15
},
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
  title:{
  flex: 1,
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#444444',
  marginTop: 5,
  marginRight: 5,
  marginLeft: 5,
},
  category: ItemCard.category,
  HomeContainer: {
  backgroundColor:"#FFFFFF"
},
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
    margin: 5,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
});