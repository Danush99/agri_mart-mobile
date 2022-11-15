import React, { useLayoutEffect, useRef, useState } from "react";
import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox} from "react-native";
//import ReactDOM from "react-dom";
import CountDown from 'react-native-countdown-component';
import Carousel, { Pagination } from "react-native-snap-carousel";
import {getIngredientName,getCategoryName,getCategoryById,} from "../../data/MockDataAPI";
import ItemBackButton from "../../components/ItemBackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton";
const { width: viewportWidth } = Dimensions.get("window");

export default function ItemScreen(props) {
  const { navigation, route } = props;
  //Once you are sure that the deprecated use is happening in a dependency you cannot control, it is possible to silence these warnings. In your App.js or somewhere else add:
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  const item = route.params?.item;
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBid, setIsBid] = useState((item.bid=="1")?true:false);
  const [isHighest, setIsHighest] = useState(false);
  const [BidFinish, setBidFinish] = useState(false);
  const slider1Ref = useRef();
  const postedDate = new Date(item.postedDate);
  const now = new Date();
  const diffTime = Math.ceil(Math.abs(now - postedDate)/1000);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTransparent: "true",
//       headerLeft: () => (<BackButton  onPress={() => {navigation.goBack()}} />),
//       headerRight: () => (<View>
//         <Image style={styles.HeaderLogo} source={require("../../assets/LogoHeader.png")} />
//       </View>),
//     });;
//   }, []);

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

  const onPressIngredient = (item) => {
    var name = getIngredientName(item);
    let ingredient = item;
    navigation.navigate("Ingredient", { ingredient, name });
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
            loop={false}
            autoplay={false}
            autoplayDelay={500}
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

        <Text style={styles.infoItemName}>{item.name}</Text>


        <View style={styles.itemDetails}>
          <Text style={styles.detail}>
              Category: {item.category}
          </Text>
          <Text style={styles.detail}>
              Available: {item.availableAmount}{item.unit}
          </Text>
          <Text style={styles.detail}>
              Unit price{"("}{item.unit}{")"}: Rs.{item.price}/=
          </Text>
        </View>

        {isBid?
            <View style={styles.infoContainer}>
                <Text style={styles.category}>
                    Bid expires after
                </Text>
            </View>:null
        }

        {isBid?
            <View style={styles.infoContainer}>
                <CountDown
                until={item.bidPeriod-diffTime}
                onFinish={() => {alert('Bidding Item Is Expired'),setBidFinish(true)}}
                
                size={20}
                />
            </View>:null
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
                    <Text style={styles.modalText}>Hello World!</Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable>
                </View>
                </View>
              </Modal>
          <ViewIngredientsButton
              buttonName="Bid for the Item"
              onPress={() =>{
                  setModalVisible(true)
              }}
          />
          </View>:null
        }

        {BidFinish?
          <View style={styles.infoContainer}>
              <Text style={styles.expireMsg}>
                  We are sorry, this item bidding period has expired!
              </Text>
          </View>:null
        }

        {isBid?null:
            <View style={styles.infoContainer}>
            <ViewIngredientsButton
                buttonName="Buy the item"
                onPress={() => {
                let availableAmount = item.availableAmount
                let title = "Ingredients for " + item.name
                navigation.navigate("BuyPhase", { item });
                }}
            />
            </View>
        }

        {isHighest?
            <View style={styles.infoContainer}>
            <ViewIngredientsButton
                buttonName="Congratulations! You can buy this"
                onPress={() => {
                  let availableAmount = item.availableAmount
                  let title = "Ingredients for " + item.name
                //navigation.navigate("IngredientsDetails", { ingredients, title });
                }}
            />
            </View>:null
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
  carousel: {},

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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoItem: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
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
  hide:{
    height:0,
    width:0,
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
    height:"40%",
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
});