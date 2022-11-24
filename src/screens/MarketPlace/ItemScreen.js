import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox} from "react-native";
//import ReactDOM from "react-dom";
import CountDown from 'react-native-countdown-component';
import Carousel, { Pagination } from "react-native-snap-carousel";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputSpinner from "react-native-input-spinner";
import {useForm, Controller} from 'react-hook-form';
import {getIngredientName,getCategoryName,getCategoryById,} from "../../data/MockDataAPI";
import ItemBackButton from "../../components/ItemBackButton";
import BackButton from '../../components/BackButton'
import MarketButton from "../../components/MarketButton";
import { TextSize } from "victory-native";
import MarketPlaceServices from "../../services/MarketPlaceServices";

const { width: viewportWidth } = Dimensions.get("window");

export default function ItemScreen(props) {
  const { navigation, route } = props;
  //Once you are sure that the deprecated use is happening in a dependency you cannot control, it is possible to silence these warnings. In your App.js or somewhere else add:
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  
  const { handleSubmit, control } = useForm();
  const item = route.params?.item;
  const UserTypeId = route.params?.TypeId;
  const UserType = route.params?.UserType;
  const UserProfile = route.params?.UserProfile;
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [isBid, setIsBid] = useState((item.bid=="1")?true:false);
  const [isHighest, setIsHighest] = useState(false);
  const [HighestBid, setHighestBid] = useState();
  const [BuyerCurrentBid, setBuyerCurrentBid] = useState();
  const [TotalBidCount, setTotalBidCount] = useState();
  //const [IsBidSold, setIsBidSold] = useState();
  const [BidAvailableToBuy, setBidAvailableToBuy] = useState();
  const [BidFinish, setBidFinish] = useState(false);
  const [CanBuy, setCanBuy] = useState(false);
  const diffTime = Math.ceil(Math.abs(now - postedDate)/1000);
  const [BidRestTime, setBidRestTime] = useState(item.bidPeriod>diffTime?item.bidPeriod-diffTime:0.5);

  const slider1Ref = useRef();
  const postedDate = new Date(item.postedDate);
  const now = new Date();
  

useEffect(() => {
  console.log("bidding::::::::",isBid)

  if(isBid){
    MarketPlaceServices.getItemBidDetails(item._id,UserProfile._id)
    .then((data)=>{
      //setIsBidSold(data.bidObject.isSold)
      if((data.bidObject.isSold)=="true"){
        setBidAvailableToBuy(false)
      }else{
        setBidAvailableToBuy(true)
      }
      
      setTotalBidCount(data.BidData.totalBidderCount)
      setHighestBid(data.BidData.maxBidValue)
      if(data.buyerAlreadyBid){
        setBuyerCurrentBid(data.BidData.buyerBidValue)
        if(data.BidData.maxBidValue==data.BidData.buyerBidValue){
          setIsHighest(true)
        }else{
          setIsHighest(false)
        }
      }else{
        setBuyerCurrentBid(false)
      }
  
      console.log("item bid details: ",data)
    })
    .catch((err)=>{
        console.log("error : ",err);
    })
  }

}, []);

console.log("-------------------------------------")
console.log("bidding",isBid)
console.log("isHighest",isHighest)
console.log("HighestBid",HighestBid)
console.log("BuyerCurrentBid",BuyerCurrentBid)
console.log("TotalBidCount",TotalBidCount)
//console.log("IsBidSold",IsBidSold)
console.log("BidAvailableToBuy",BidAvailableToBuy)
console.log("BidFinish",BidFinish)
console.log("BidRestTime",BidRestTime)
console.log("Can you buy the item",(isBid&&isHighest&&BidFinish&&!BidAvailableToBuy))
console.log("-------------------------------------")

useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
      headerLeft: () => (
        <ItemBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View/>,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  const onSubmit = (data) => {
    setModalVisible(!modalVisible)
    const submitAmount = data.amount
    console.log("data front end: ",item,submitAmount,UserTypeId,item.farmerID)
    MarketPlaceServices.bidOnItem(item,submitAmount,UserTypeId,item.farmerID)
    .then((res)=>{
      console.log(res.message)
    })
    .catch((err)=>{
      console.log(err)
    })
    // const UserType = "buyer"
    // const TypeId = UserTypeId
    // navigation.navigate("MyOrders",{TypeId,UserType})
    //const allData = Object.assign({}, formdata, data);
    console.log("data",data);
    //navigation.navigate('FarmerRegister3', { formID: 2,formdata: allData,})
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={item.img}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={true}
            autoplay={true}
            autoplayDelay={3000}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={item.img.length}
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
        <Text style={styles.infoItemName}>{item.name}</Text>

        <View style={styles.itemDetails}>

          <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Category          </Text>
          <Text style={{}}>{item.category}</Text>
          </View>

          <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Available         </Text>
          <Text style={{}}>{item.availableAmount}{item.unit}</Text>
          </View>

          {isBid?
          <View>
          <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Bid starting at  </Text>
          <Text style={{}}>Rs.{item.price}/=</Text>
          </View>
          <Text style={styles.detail}>{"("}Unit price{")"} </Text>
          <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Bidders count  </Text>
          <Text style={{}}>{TotalBidCount==null?"0":TotalBidCount}</Text>
          </View>
          <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Highest bid price  </Text>
          <Text style={{}}>Rs.{HighestBid==null?"0":HighestBid}/=</Text>
          </View>
          <Text style={styles.detail}>{"("}Unit price{")"} </Text>
          <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Your current bid price  </Text>
          <Text style={{}}>Rs.{(BuyerCurrentBid==null?"0":BuyerCurrentBid)}/=</Text>
          </View>
          <Text style={styles.detail}>{"("}Unit price{")"} </Text>
          </View>
          
          :          
          <View style={styles.mainInfoContainer}>
          <Text style={styles.detail}>Unit price{"("}{item.unit}{")"}  </Text>
          <Text style={{}}>Rs.{item.price}/=</Text>
          </View>
          }

          
        </View>

        {isBid?
            <>
            <View style={styles.infoContainer}>
                <Text style={styles.category}>
                    Bid expires after
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <CountDown
                //until={item.bidPeriod-diffTime}
                until={BidRestTime}
                //until={5}
                onFinish={() => {alert('Bidding Item Is Expired'),setBidFinish(true)}}
                
                size={20}
                />
            </View>
            </>:null
            
        }


        {isBid&&!BidFinish?
          <View style={styles.infoContainer}>

              <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              setModalVisible(!modalVisible);
              }}
              >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                  >
                  <MaterialCommunityIcons name="close" size={30} />
                  </Pressable>

                  <View>
                    <Text style={styles.modalHead}>Bid with your highest</Text>
                  </View>

                  <View >

                    <View style={styles.mainInfoContainer}>
                    <Text style={styles.detail}>Available         </Text>
                    <Text style={{}}>{item.availableAmount}{item.unit}</Text>
                    </View>

                    <View>
                    <View style={styles.mainInfoContainer}>
                    <Text style={styles.detail}>Bid starting at  </Text>
                    <Text style={{}}>Rs.{item.price}/=</Text>
                    </View>
                    <Text style={styles.detail}>{"("}Unit price{")"} </Text>
                    </View>

                    <View style={styles.mainInfoContainer}>
                    <Text style={{color:"black",textDecorationLine: 'underline'}}>Information:</Text>
                    <Text style={{color:"red"}}>You are bidding on the whole stock</Text>
                    </View>

                  </View>

                  
                  <Controller
                    name="amount"
                    defaultValue=""
                    control={control}
                    render={({ field: { onChange, value } }) => (
                    <View style={styles.centeredView}>
                    <Text style={styles.detail}>Bid for the unit price:</Text>
                    <View style={styles.mainInfoContainer}>
                    <Text style={styles.detail}>Total bill: </Text>
                    <Text style={{}}>Rs.{item.availableAmount*value}/=</Text>
                    </View>
                    <InputSpinner
                        max={item.availableAmount*1000}
                        min={BuyerCurrentBid?BuyerCurrentBid:item.price}
                        step={20}
                        prepend={<Text style={{paddingLeft:40}}>Rs.</Text>}
                        append={<Text style={{paddingRight:20}}>/=</Text>}
                        value={value}
                        onChange={onChange}
                    />
                    </View>
                    )}
                    />
                    <MarketButton
                      buttonName="Confirm"
                      onPress={handleSubmit(onSubmit)}
                    />


                </View>
                </View>
              </Modal>
            
          {UserType=="buyer"?
            <MarketButton
            buttonName="Bid for the Item"
            onPress={() =>{
                setModalVisible(true)
            }}
            />
          :
            <Text style={styles.expireMsg}>If you want to buy this item you have to signup as a buyer!</Text>
          }

          </View>:null
        }


        {isBid?
            null
        :
            <View style={styles.infoContainer}>
                {UserType=="buyer"?
                  <MarketButton
                  buttonName="Buy the item"
                  onPress={() => {
                  let availableAmount = item.availableAmount
                  let title = "Ingredients for " + item.name
                  navigation.navigate("BuyPhase", { item,UserTypeId,UserProfile,isBid });
                  }}
                  />
                :
                <Text style={styles.expireMsg}>If you want to buy this item you have to signup as a buyer!</Text>
                }
            </View>
        }

        {isBid&&isHighest&&BidFinish&&BidAvailableToBuy?
            <>
              <Text style={{fontSize: 20,fontWeight: 'bold',marginTop: 15,marginBottom:-15,color: '#B021B7',textAlign: 'center'}}>Congratulations! You are the highest Bidder</Text>
              <View >
                <MarketButton
                    buttonName="Lets Buy!"
                    onPress={() => {
                      navigation.navigate("BuyPhase", { item,UserTypeId,UserProfile,isBid,BuyerCurrentBid });}}
                />
              </View>
            </>:      
            <>  
            {isBid&&BidFinish?
              <View style={styles.infoContainer}>
                <Text style={styles.expireMsg}> We are sorry, this item bidding period has expired!</Text>
              </View>:null  
            }
            </>
        }


        
        <View style={styles.infoContainer}>
          <Text style={styles.desc}>
              About the Item:
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionItem}>{item.Desc}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  infoItemContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a',
  },
  expireMsg:{
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: '#8B0404',
    textAlign: 'center'
  },
  desc:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#1D3F2E',
    textDecorationLine: 'underline',
  },
  infoDescriptionItem: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 5,
    margin: 15
  },
  infoItemName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    width:"80%",
    height:"70%",
    borderWidth:2,
    borderColor:"#48e15a",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  mainInfoContainer:{
    marginLeft:0,
    marginTop:10,
    flexDirection: 'row',
    flexWrap: 'wrap',  
  },
  detail:{
    fontWeight: 'bold'
  },
  itemDetails:{
    marginBottom:30,
  },
  modalHead:{
    fontWeight: 'bold',
    fontSize:20,
    textDecorationLine: 'underline',
  },
  buttonClose:{
    alignSelf: 'flex-end',
    //alignItems:"right",
    marginTop: 3,
    paddingRight: 5,
    position: 'absolute', // add if dont work with above
  }
});