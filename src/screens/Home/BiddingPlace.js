import React, { useLayoutEffect, useRef, useState,useEffect } from "react";
import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Table, Row, Rows } from 'react-native-table-component';
import BackButton from '../../components/BackButton'
import AuthServices from "../../services/AuthServices";


const { width: viewportWidth } = Dimensions.get("window");
const state= {
    tableHead: ['Item name', 'Max bid', 'Max bidders count', 'Bid Count'],
    tableData: []}

const CarouselImages = ["https://images.unsplash.com/photo-1559379537-6c816c8f1168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF1Y3Rpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60","https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60","https://plus.unsplash.com/premium_photo-1661488304619-7ce12da34bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"]

export default function BiddingPlace(props) {
    const { navigation, route } = props;
    const _id = route.params?.TypeId;
    const UserType = route.params?.UserType
    const [AllBids, setAllBids] = useState();
    const [TableData, setTableData] = useState();

    const slider1Ref = useRef();
    const [activeSlide, setActiveSlide] = useState(0);
    const renderImage = ({ item }) => (
        <TouchableHighlight>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item }} />
          </View>
        </TouchableHighlight>
      );

      Array.prototype.max = function() {
        return Math.max.apply(null, this);
      };
      
      Array.prototype.min = function() {
        return Math.min.apply(null, this);
      };

      useEffect(() => {
        AuthServices.GetBiddings(_id,UserType)
        .then((res) => {
          if(res.success){
            
            const biddings = res.biddings
            console.log("Biddings in front end",biddings)
            var TemptableData=[]

            for(let x=0;x<biddings.length;x++){
                var dataRow=[]

                const bid = biddings[x]
                const bidValues = bid.bidValues
                const maxBidValue = (bidValues.length==0?0:Math.max(...bidValues))

                const counts = {};
                bidValues.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
                const highestBiddersCount = (maxBidValue==0?0:counts[maxBidValue])

                const buyersList = bid.buyers
                const buyerCount = (buyersList?(buyersList.length):0)

                dataRow.push(bid.itemName)
                dataRow.push(maxBidValue)
                dataRow.push(highestBiddersCount)
                dataRow.push(buyerCount)
                TemptableData.push(dataRow)
            }
            setTableData(TemptableData)
            setAllBids(biddings)

            console.log("Farmer products getting is success:: ");

          }else{
            console.log("backend error : ",res.message)
          }
        })
        .catch((err) => {
          console.log("backend error : ",err)
        });
      }, []);

    return (
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
                autoplayInterval={2000}
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
            <Text style={styles.infoItemName}>Bidding Place</Text>
        </View>

        <View style={styles.container}>
            <Table heightArr={20} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={state.tableHead} style={styles.head} textStyle={{ margin: 2,textAlign:"center" }}/>
            <Rows data={TableData} textStyle={{ margin: 6 }}/>
            </Table>
        </View>

    </ScrollView>
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
});