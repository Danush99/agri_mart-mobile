import React, { useLayoutEffect, useRef, useState } from "react";
import {Modal,Pressable,ScrollView,Text,View,Image,Dimensions,TouchableHighlight,StyleSheet,LogBox,} from "react-native";
import {useForm, Controller} from 'react-hook-form';
//import ReactDOM from "react-dom";
import CountDown from 'react-native-countdown-component';
import Carousel, { Pagination } from "react-native-snap-carousel";
import CheckBox from 'react-native-check-box'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {getIngredientName,getCategoryName,getCategoryById,} from "../../data/MockDataAPI";
import ItemBackButton from "../../components/ItemBackButton";
import BackButton from '../../components/BackButton'
import TextInput from '../../components/TextInput'
import NextIcon from '../../components/NextIcon'
import Button from '../../components/Button'
import InputSpinner from "react-native-input-spinner";
import Logo from '../../components/Logo'
import MarketPlaceServices from "../../services/MarketPlaceServices";



import ViewIngredientsButton from "../../components/MarketButton";
const { width: viewportWidth } = Dimensions.get("window");

export default function BuyPhase(props) {
  const { navigation, route } = props;
  const item = route.params?.item;
  const UserTypeId = route.params?.UserTypeId;
  const [activeSlide, setActiveSlide] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBid, setIsBid] = useState((item.bid=="1")?true:false);
  const [isHighest, setIsHighest] = useState(false);
  const [BidFinish, setBidFinish] = useState(false);
  const [IsPickup, setIsPickup] = useState(false);
  const [IsDelivery, setIsDelivery] = useState(false);
  const { handleSubmit, control } = useForm();
  const slider1Ref = useRef();
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTransparent: "true",
//       headerLeft: () => (<BackButton  onPress={() => {navigation.goBack()}} />),
//       headerRight: () => (<View>
//         <Image style={styles.HeaderLogo} source={require("../../assets/LogoHeader.png")} />
//       </View>),
//     });;
//   }, []);

// useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTransparent: "true",
//       headerLeft: () => (
//         <ItemBackButton
//           onPress={() => {
//             navigation.goBack();
//           }}
//         />
//       ),
//       headerRight: () => <View/>,
//     });
//   }, []);

  const onSubmit = (data) => {
    const allData = Object.assign({}, data, {IsDelivery:IsDelivery});
    console.log("data::::::::  ,",data);
    MarketPlaceServices.DirectBuying(allData,item,UserTypeId)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    const UserType = "buyer"
    const TypeId = UserTypeId
    navigation.navigate("MyOrders",{TypeId,UserType})
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoItemContainer}>
      <BackButton goBack={navigation.goBack} />
        <Text style={styles.infoItemName}>Checkout</Text>
        <Logo />
        <View style={styles.itemDetails}>

          <View style={styles.infoContainer}>
          <Text style={styles.detail}>Category          </Text>
          <Text style={{}}>{item.category}</Text>
          </View>

          <View style={styles.infoContainer}>
          <Text style={styles.detail}>Available         </Text>
          <Text style={{}}>{item.availableAmount} {item.unit}</Text>
          </View>

          <View style={styles.infoContainer}>
          <Text style={styles.detail}>Unit price{"("}{item.unit}{")"}  </Text>
          <Text style={{}}>Rs.{item.price}/=</Text>
          </View>
          
        </View>

        <View style={styles.infoContainer}>
        <Text style={styles.detail}>Delivery              </Text>
        <BouncyCheckbox
        size={25}
        fillColor="#000000"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "#000000" }}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={IsDelivery}
        onPress={()=>{setIsDelivery(!IsDelivery),setIsPickup(false)}}
        disableBuiltInState
        />
        </View>

        <View style={styles.infoContainer}>
        <Text style={styles.detail}>PickUp at farm  </Text>
        <BouncyCheckbox
        size={25}
        fillColor="#000000"
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "#000000" }}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={IsPickup}
        onPress={()=>{{setIsPickup(!IsPickup),setIsDelivery(false)}}}
        disableBuiltInState
        />
        </View>

        <View>

            <Controller
            name="name"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                placeholder="Name"
                onChangeText={onChange}
                value={value}
            />
            )}
            />

            <Controller
            name="m_Number"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                placeholder="Mobile Number"
                onChangeText={onChange}
                value={value}
            />
            )}
            />

            <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                placeholder="Email"
                onChangeText={onChange}
                value={value}
            />
            )}
            />

            {IsDelivery?
            <Controller
            name="address"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                placeholder="Your Address"
                onChangeText={onChange}
                value={value}
                numberOfLines={3}
                multiline={true}
            />
            )}
            />:null
            }

            <Controller
            name="amount"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
            <InputSpinner
                max={item.availableAmount*1000}
                min={100}
                step={100}
                prepend={<Text style={{paddingLeft:40}}>Amount</Text>}
                append={<Text style={{paddingRight:40}}>g</Text>}
                value={value}
                onChange={onChange}
            />
            )}
            />


            {IsPickup?
            <View style={styles.itemDetails}>
                <View style={styles.infoContainer}>
                    <Text style={styles.detail}>Farm address:   </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.detail}>Farmer's mobile number:   </Text>
                </View>
            </View>:null
            }

            <Button
            onPress={handleSubmit(onSubmit)}
            mode="contained"
            style={styles.submit}
            >Buy Now
            </Button>

        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:0,
    borderColor:"#25B70E",
    borderWidth:2,
    backgroundColor: 'white',
    flex: 1
  },
  infoItemName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  infoItemContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
  },
  submit: {
    marginTop: 24,
    width: '50%',
    height: 50,
    // borderWidth: 0.5,
    // borderRadius: 15
  },
  infoContainer:{
    marginLeft:0,
    marginTop:10,
    flexDirection: 'row',
    flexWrap: 'wrap',  
  },
  itemDetails:{

  },
  detail:{
    fontWeight: 'bold'
  }
});