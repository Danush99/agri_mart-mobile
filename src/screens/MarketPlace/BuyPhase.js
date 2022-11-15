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
import TextInput from '../../components/TextInput'
import NextIcon from '../../components/NextIcon'
import Button from '../../components/Button'

import ViewIngredientsButton from "../../components/ViewIngredientsButton";
const { width: viewportWidth } = Dimensions.get("window");

export default function BuyPhase(props) {
  const { navigation, route } = props;
  const item = route.params?.item;
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
    //const allData = Object.assign({}, formdata, data);
    console.log("data",data);
    //navigation.navigate('FarmerRegister3', { formID: 2,formdata: allData,})
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoItemContainer}>

        <Text style={styles.infoItemName}>BuyPhase</Text>


        <View style={styles.itemDetails}>

          <View style={styles.infoContainer}>
          <Text style={styles.detail}>Category          </Text>
          <Text style={{}}>{item.category}</Text>
          </View>

          <View style={styles.infoContainer}>
          <Text style={styles.detail}>Available         </Text>
          <Text style={{}}>{item.availableAmount}{item.unit}</Text>
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

            <Controller
            name="amount"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextInput
                placeholder="Amount"
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
            />
            )}
            />:null
            }

            {IsPickup?
            <View style={styles.itemDetails}>
            <Text style={styles.detail}>Farm address:   </Text>
            <Text style={styles.detail}>Farmer's mobile number:   </Text>
            </View>:null
            }

            <Button
            onPress={handleSubmit(onSubmit)}
            mode="contained"
            style={styles.submit}
            >Buy
            </Button>

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
  infoItemName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  infoContainer:{
    marginLeft:0,
    marginTop:0,
    flexDirection: 'row',
    flexWrap: 'wrap',  
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
  }
});